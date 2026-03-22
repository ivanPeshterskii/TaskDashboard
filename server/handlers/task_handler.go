package handlers

import (
	"errors"
	"net/http"
	"strconv"
	"strings"
	"time"

	"task-dashboard-server/database"
	"task-dashboard-server/models"
	"task-dashboard-server/utils"

	"github.com/gin-gonic/gin"
)

type CreateTaskInput struct {
	Title       string `json:"title"`
	Description string `json:"description"`
	Priority    string `json:"priority"`
	Status      string `json:"status"`
	DueDate     string `json:"dueDate"`
}

type UpdateTaskInput struct {
	Title       string `json:"title"`
	Description string `json:"description"`
	Priority    string `json:"priority"`
	Status      string `json:"status"`
	DueDate     string `json:"dueDate"`
}

func parseDueDate(dateStr string) (*time.Time, error) {
	dateStr = strings.TrimSpace(dateStr)
	if dateStr == "" {
		return nil, nil
	}

	if parsed, err := time.Parse("2006-01-02", dateStr); err == nil {
		return &parsed, nil
	}

	if parsed, err := time.Parse(time.RFC3339, dateStr); err == nil {
		dateOnly := time.Date(parsed.Year(), parsed.Month(), parsed.Day(), 0, 0, 0, 0, time.UTC)
		return &dateOnly, nil
	}

	return nil, errors.New("invalid due date format")
}

func GetTasks(c *gin.Context) {
	priority := c.Query("priority")
	search := c.Query("search")

	var tasks []models.Task
	query := database.DB

	if priority != "" {
		query = query.Where("priority = ?", priority)
	}

	if search != "" {
		query = query.Where("LOWER(title) LIKE ?", "%"+strings.ToLower(search)+"%")
	}

	query.Order("created_at desc").Find(&tasks)
	c.JSON(http.StatusOK, tasks)
}

func CreateTask(c *gin.Context) {
	var input CreateTaskInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request body"})
		return
	}

	if strings.TrimSpace(input.Title) == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Title is required"})
		return
	}

	if input.Priority == "" {
		input.Priority = "Medium"
	}

	if input.Status == "" {
		input.Status = "To Do"
	}

	dueDate, err := parseDueDate(input.DueDate)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid due date format. Use YYYY-MM-DD"})
		return
	}

	task := models.Task{
		Title:       input.Title,
		Description: input.Description,
		Priority:    input.Priority,
		Status:      input.Status,
		DueDate:     dueDate,
	}

	if err := database.DB.Create(&task).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create task"})
		return
	}

	utils.LogActivity(task.ID, "CREATE", "Task created")
	c.JSON(http.StatusCreated, task)
}

func UpdateTask(c *gin.Context) {
	idParam := c.Param("id")
	id, err := strconv.Atoi(idParam)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid task ID"})
		return
	}

	var task models.Task
	if err := database.DB.First(&task, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Task not found"})
		return
	}

	var input UpdateTaskInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request body"})
		return
	}

	if strings.TrimSpace(input.Title) == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Title is required"})
		return
	}

	dueDate, err := parseDueDate(input.DueDate)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid due date format. Use YYYY-MM-DD"})
		return
	}

	oldStatus := task.Status

	task.Title = input.Title
	task.Description = input.Description
	task.Priority = input.Priority
	task.Status = input.Status
	task.DueDate = dueDate

	if err := database.DB.Save(&task).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update task"})
		return
	}

	utils.LogActivity(task.ID, "UPDATE", "Task updated")

	if oldStatus != task.Status {
		utils.LogActivity(task.ID, "STATUS_CHANGE", "Status changed from "+oldStatus+" to "+task.Status)
	}

	c.JSON(http.StatusOK, task)
}

func DeleteTask(c *gin.Context) {
	idParam := c.Param("id")
	id, err := strconv.Atoi(idParam)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid task ID"})
		return
	}

	var task models.Task
	if err := database.DB.First(&task, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Task not found"})
		return
	}

	if err := database.DB.Delete(&task).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete task"})
		return
	}

	utils.LogActivity(task.ID, "DELETE", "Task deleted")
	c.JSON(http.StatusOK, gin.H{"message": "Task deleted successfully"})
}

func GetActivityLog(c *gin.Context) {
	limitParam := c.DefaultQuery("limit", "10")
	offsetParam := c.DefaultQuery("offset", "0")

	limit, err := strconv.Atoi(limitParam)
	if err != nil || limit < 0 {
		limit = 10
	}

	offset, err := strconv.Atoi(offsetParam)
	if err != nil || offset < 0 {
		offset = 0
	}

	var logs []models.ActivityLog
	if err := database.DB.
		Order("created_at desc").
		Limit(limit).
		Offset(offset).
		Find(&logs).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch activity log"})
		return
	}

	c.JSON(http.StatusOK, logs)
}