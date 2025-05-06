import os
import subprocess
import sys
import platform
import shutil

# Define essential system paths
system_paths = [
    os.path.expanduser("~/Library/Application Support"),
    os.path.expanduser("~/Library/Caches"),
    os.path.expanduser("~/Library/Logs")
]

# Get appropriate Python command for the system
def get_python_executable():
    return "python" if platform.system() == "Windows" else "python3"

# Verify write permissions for required directories
def check_directory_permissions(path_list):
    for directory in path_list:
        if not os.path.exists(directory):
            try:
                os.makedirs(directory, exist_ok=True)
            except:
                return False
        if not os.access(directory, os.W_OK):
            return False
    return True

# Display permission error message
def show_permission_error():
    print("\n Insufficient permissions to access system directories.")
    print("Please execute this script with elevated privileges.")
    if platform.system() == "Darwin":
        print("\n Run the script with sudo:\n")
        print("   sudo python3 main.py\n")
    elif platform.system() == "Linux":
        print("\n Run the script with sudo:\n")
        print("   sudo python3 main.py\n")
    else:
        print("Ensure you're running as Administrator.\n")
    sys.exit(1)

# Verify and update pip installation
def verify_pip_installation(python_cmd):
    try:
        result = subprocess.run([python_cmd, "-m", "pip", "--version"], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        if result.returncode != 0:
            print("pip not detected. Installing pip...")
            subprocess.run([python_cmd, "-m", "ensurepip"], check=True)
        print("Updating pip to latest version...")
        subprocess.run([python_cmd, "-m", "pip", "install", "--upgrade", "pip"], check=True)
        print(" pip installation verified.")
    except Exception as err:
        print(f" pip setup error: {err}")
        sys.exit(1)

# Windows-specific PATH configuration
def configure_windows_path():
    try:
        python_location = shutil.which("python")
        pip_location = shutil.which("pip")
        if not python_location:
            print("Python executable not found in PATH.")
            return
        python_directory = os.path.dirname(python_location)
        current_path = os.environ.get("PATH", "")
        if python_directory not in current_path:
            print(f"Adding {python_directory} to system PATH...")
            subprocess.run(["setx", "PATH", f"{current_path};{python_directory}"], shell=True)
        if pip_location is None:
            print("pip not found, performing reinstallation...")
            subprocess.run([python_location, "-m", "ensurepip"], check=True)
            subprocess.run([python_location, "-m", "pip", "install", "--upgrade", "pip"], check=True)
    except Exception as err:
        print(f"PATH configuration failed: {err}")
        sys.exit(1)

def ensure_all_good():
    current_os = platform.system()
    python_cmd = get_python_executable()

    if current_os == "Windows":
        configure_windows_path()
        verify_pip_installation("python")
    else:
        print(f"Detected operating system: {current_os}")
        if not check_directory_permissions(system_paths):
            show_permission_error()
        verify_pip_installation(python_cmd)

if __name__ == "__main__":
    ensure_all_good()
