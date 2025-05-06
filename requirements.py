import sys
import subprocess
import platform
from python_healt_repair import ensure_all_good


ensure_all_good()

def get_python_version():
    version = sys.version_info
    return f"{version[0]}.{version[1]}"

mac_packages = {
    "3.7": [
        "requests==2.27.1",
        "PyQt5==5.15.7",
        "Pillow==9.5.0",
        "pyzipper==0.3.5"
    ],
    "3.8": [
        "requests>=2.27.1,<3.0.0",
        "Pillow>=9.5.0",
        "certifi>=2022.12.7",
        "psutil>=5.9.0",
        "pycryptodome>=3.15.0",
        "PyQt5>=5.15.7",
        "pyzipper>=0.3.5",
        "typing-extensions>=4.0.0"
    ],
    "3.9": [
        "requests==2.31.0",
        "PyQt5==5.15.10",
        "Pillow==10.0.1",
        "pyzipper==0.3.6"
    ],
    "3.10": [
        "requests==2.31.0",
        "PyQt5==5.15.10",
        "Pillow==10.1.0",
        "pyzipper==0.3.6"
    ],
    "3.11": [
        "requests==2.27.1",
        "PyQt5==5.15.7",
        "Pillow==9.5.0",
        "pyzipper==0.3.5"
    ],
    "3.12": [
        "requests==2.31.0",
        "PyQt5==5.15.10",
        "Pillow==10.1.0",
        "pyzipper==0.3.6"
    ],
    "3.13": [
        "requests==2.27.1",
        "PyQt5>=5.15.9",
        "Pillow>=10.0.0",
        "pyzipper==0.3.5"
    ]
}

win_packages = [
    "requests>=2.0.0",
    "pycryptodomex>=3.10.1",
    "pywin32>=306",
    "Pillow>=10.3.0",
    "certifi>=2022.12.7",
    "psutil>=6.0.0",
    "pycryptodome>=3.20.0",
    "PyAutoGUI>=0.9.54"
]

def setup_dependencies():
    os_type = platform.system()
    py_version = get_python_version()

    if os_type == "Windows":
        packages = win_packages
        python_exec = "python"
    else:
        packages = mac_packages.get(py_version, [])
        python_exec = "python3"

    if not packages:
        print(f"No packages defined for Python version: {py_version}")
        return

    for dependency in packages:
        try:
            subprocess.run([python_exec, "-m", "pip", "install", dependency], check=True)
            print(f"Successfully installed: {dependency}")
        except subprocess.CalledProcessError as err:
            print(f"Installation failed for {dependency}: {err}")

if __name__ == "__main__":
    setup_dependencies()
