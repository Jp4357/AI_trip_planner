# AI Trip Planner

This project uses [uv](https://github.com/astral-sh/uv) for Python environment and dependency management.

## Setup Instructions

### 1. Show uv Help

```sh
uv --help
```

### 2. Python Environment Commands

```sh
uv python
uv python list
```

### 3. Clear Terminal (Windows)

```sh
cls
```

### 4. Create Virtual Environment

```sh
uv venv -p=3.10
uv venv
```

### 5. Activate Virtual Environment (Windows)

```sh
.venv\Scripts\activate
```

### 6. Sync Dependencies

```sh
uv sync
```

### 7. Initialize Project

```sh
uv init .
uv init --help
uv init -p=3.10
```

### 8. List Installed Packages

```sh
uv pip list
```

### 9. Install Dependencies

```sh
uv pip install langchain
```

### 10. View Command History (Windows)

```sh
doskey /history
```

---

**Note:**  
Replace or remove any commands as needed for your workflow.  
For more information, see the [uv documentation](https://github.com/astral-sh/uv)