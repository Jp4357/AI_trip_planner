from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from agent.agentic_workflow import GraphBuilder
from utils.save_to_document import save_document
from starlette.responses import JSONResponse
import os
import datetime
from dotenv import load_dotenv
from pydantic import BaseModel
import shutil
from typing import List
from tools.send_email_tool import SendEmailTool

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # set specific origins in prod
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class QueryRequest(BaseModel):
    question: str


class EmailRequest(BaseModel):
    email: List[str]
    subject: str
    body: str


@app.post("/query")
async def query_travel_agent(query: QueryRequest):
    try:
        print(query)
        graph = GraphBuilder(model_provider="groq")
        react_app = graph()
        # react_app = graph.build_graph()

        png_graph = react_app.get_graph().draw_mermaid_png()
        with open("my_graph.png", "wb") as f:
            f.write(png_graph)

        print(f"Graph saved as 'my_graph.png' in {os.getcwd()}")
        # Assuming request is a pydantic object like: {"question": "your text"}
        messages = {"messages": [query.question]}
        output = react_app.invoke(messages)

        # If result is dict with messages:
        if isinstance(output, dict) and "messages" in output:
            final_output = output["messages"][-1].content  # Last AI response
        else:
            final_output = str(output)
        save_document(final_output)
        return {"answer": final_output}
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})


# Assuming you have a Pydantic model


@app.post("/send-email")
async def send_message(email_request: EmailRequest):
    try:
        # Initialize tool
        email_instance = SendEmailTool()
        email_tool = email_instance.get_send_email_tool()

        file_dir = "./output"

        # ✅ Ensure directory exists
        if not os.path.exists(file_dir):
            return JSONResponse(
                status_code=400, content={"error": "Output directory does not exist."}
            )

        # ✅ Get latest file in directory
        files = [
            f for f in os.listdir(file_dir) if os.path.isfile(os.path.join(file_dir, f))
        ]

        if not files:
            return JSONResponse(
                status_code=400, content={"error": "No files found to attach."}
            )

        latest_file = max(
            files, key=lambda f: os.path.getctime(os.path.join(file_dir, f))
        )
        file_path = os.path.join(file_dir, latest_file)

        result = await email_tool.ainvoke(
            {
                "to": email_request.email,
                "subject": email_request.subject,
                "body": email_request.body,
                "file_path": file_path,
            }
        )

        return {"status": "success", "detail": result}

    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})
