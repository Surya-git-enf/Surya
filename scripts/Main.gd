extends Control

@onready var btn := $StartButton
@onready var lbl := $Label

func _ready():
    lbl.text = "Playable Template — ready!"
    btn.pressed.connect(_on_button_pressed)

func _on_button_pressed():
    lbl.text = "You pressed Play! 🎮"
    btn.disabled = true
