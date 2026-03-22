package utils

import (
	"task-dashboard-server/database"
	"task-dashboard-server/models"
)

func LogActivity(taskID uint, action string, details string) {
	logEntry := models.ActivityLog{
		TaskID:  taskID,
		Action:  action,
		Details: details,
	}

	database.DB.Create(&logEntry)
}
