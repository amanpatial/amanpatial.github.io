#!/bin/bash

# Function to check if a port is in use
check_port() {
    lsof -Pi :$1 -sTCP:LISTEN -t >/dev/null 2>&1
    return $?
}

# Function to stop process on a port
stop_port() {
    local port=$1
    if check_port $port; then
        echo "Stopping server on port $port..."
        PIDS=$(lsof -Pi :$port -sTCP:LISTEN -t 2>/dev/null)
        if [ ! -z "$PIDS" ]; then
            # Try graceful kill first
            echo "$PIDS" | xargs kill 2>/dev/null
            sleep 2
            # Force kill if still running
            if check_port $port; then
                echo "$PIDS" | xargs kill -9 2>/dev/null
                sleep 1
            fi
            echo "Server stopped on port $port."
            return 0
        fi
    fi
    return 1
}

# Check common development ports (8000-8010)
STOPPED_ANY=false
for port in {8000..8010}; do
    if stop_port $port; then
        STOPPED_ANY=true
    fi
done

if [ "$STOPPED_ANY" = false ]; then
    echo "No servers found running on ports 8000-8010."
fi
