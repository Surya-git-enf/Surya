extends Node2D

var score := 0

func _input(event):
    if event is InputEventScreenTouch and event.pressed:
        score += 1
        print("Score:", score)
