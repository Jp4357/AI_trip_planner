import os
import datetime
import shutil


def save_document(response_text: str, directory: str = "./output"):
    """Save AI travel plan to Markdown file, keeping only the latest file."""
    directory = os.path.abspath(directory)
    os.makedirs(directory, exist_ok=True)

    # 🧹 Clean directory BEFORE saving new file
    for file in os.listdir(directory):
        file_path = os.path.join(directory, file)
        try:
            if os.path.isfile(file_path):
                os.remove(file_path)
        except Exception as e:
            print(f"Error deleting file {file_path}: {e}")

    # Create markdown content
    markdown_content = f"""# 🌍 AI Travel Plan

**Generated:** {datetime.datetime.now().strftime('%Y-%m-%d at %H:%M')}  
**Created by:** JP's Travel Agent

---

{response_text}

---

*This travel plan was generated by AI. Please verify all information, especially prices, operating hours, and travel requirements before your trip.*
"""

    # 📄 Save new file
    timestamp = datetime.datetime.now().strftime("%Y-%m-%d_%H-%M-%S")
    filename = os.path.join(directory, f"AI_Trip_Planner_{timestamp}.md")

    try:
        with open(filename, "w", encoding="utf-8") as f:
            f.write(markdown_content)
        print(f"Markdown file saved as: {filename}")
        return filename
    except Exception as e:
        print(f"Error saving markdown file: {e}")
        return None
