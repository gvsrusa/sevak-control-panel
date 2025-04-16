# Motor Configuration
MOTOR_CONFIG = {
    'left_motor': {
        'pin': 1,
        'max_speed': 1.0,
        'min_speed': -1.0
    },
    'right_motor': {
        'pin': 2,
        'max_speed': 1.0,
        'min_speed': -1.0
    },
    'cutting_motor': {
        'pin': 3,
        'max_speed': 1.0
    },
    'loading_motor': {
        'pin': 4,
        'max_speed': 1.0,
        'min_speed': -1.0
    }
}

# Sensor Configuration
SENSOR_CONFIG = {
    'temperature_sensor': {
        'port': '/dev/ttyUSB0',
        'baud_rate': 9600
    },
    'battery_sensor': {
        'pin': 17,
        'voltage_divider': 0.5
    }
}

# Safety Limits
SAFETY_LIMITS = {
    'max_temperature': 60,  # °C
    'min_battery': 20,      # %
    'max_speed': 10,        # km/h
    'emergency_stop_delay': 0.5  # seconds
}

# Communication Settings
COMMUNICATION = {
    'mqtt_broker': 'localhost',
    'mqtt_port': 1883,
    'telemetry_topic': 'tractor/telemetry',
    'control_topic': 'tractor/control'
} 