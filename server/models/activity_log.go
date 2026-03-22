package models

import "time"

type ActivityLog struct {
	ID        uint      `json:"id" gorm:"primaryKey"`
	TaskID     uint      `json:"taskId"`
	Action     string    `json:"action"`
	Details    string    `json:"details"`
	CreatedAt  time.Time `json:"createdAt"`
}