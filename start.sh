#!/bin/bash

PORT=8000

# Function to check if a port is in use
check_port() {
    lsof -Pi :$1 -sTCP:LISTEN -t >/dev/null 2>&1
    return $?
}

# Check if port 8000 is already in use
if check_port $PORT; then
    echo "Port $PORT is already in use. Stopping the process using it..."
    PIDS=$(lsof -Pi :$PORT -sTCP:LISTEN -t 2>/dev/null)
    if [ ! -z "$PIDS" ]; then
        # Kill all processes using the port (handles multiple PIDs)
        echo "$PIDS" | xargs kill 2>/dev/null
        # Wait a bit and try force kill if still in use
        sleep 2
        if check_port $PORT; then
            echo "$PIDS" | xargs kill -9 2>/dev/null
            sleep 1
        fi
        # Verify port is actually free before proceeding
        if check_port $PORT; then
            echo "Warning: Port $PORT is still in use. Please check manually."
            exit 1
        fi
        echo "Process stopped. Starting server on port $PORT..."
    fi
fi

echo "Starting server on port $PORT..."
echo "Your site will be available at: http://localhost:$PORT"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

# Start the Python HTTP server
python3 -m http.server $PORT
