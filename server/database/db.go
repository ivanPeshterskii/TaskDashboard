package database

import (
	"log"

	"task-dashboard-server/models"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var DB *gorm.DB

func Connect() {
	db, err := gorm.Open(sqlite.Open("tasks.db"), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}

	err = db.AutoMigrate(&models.Task{}, &models.ActivityLog{})
	if err != nil {
		log.Fatal("Failed to migrate database:", err)
	}

	DB = db
}
