# HR.ai Workspace

Welcome to the **HR.ai** workspace. This repository serves as the central hub for the design, planning, and implementation of the MVP for the Intelligent Human Resources Management & Analytics System.

## Project Structure

This workspace is organized into the following key documentation files, which should be read in order:

1.  [**Concept: HR.ai Integration**](./docs/01_HR_ai_Concept.md)
    *   **Overview:** Introduction to the problem, the solution (LLM + SQL), and the core value proposition.
    *   **Key Features:** Conversational Analytics, Real-time Reporting.

2.  [**System Design Specification**](./docs/02_HR_ai_System_Design.md)
    *   **Technical Architecture:** RAG model, Semantic Layer, Metadata definitions.
    *   **Database Schema:** Employees, Work Logs tables.
    *   **Implementation Strategy:** Step-by-step guide from Vector Store to Frontend.

3.  [**UX Strategy & Advanced Features**](./docs/03_HR_ai_UX_and_Features.md)
    *   **UX/UI:** Smart Command Bar, Exploration Mode.
    *   **Edge Cases:** Handling ambiguous questions, data inconsistency, and security (RLS).
    *   **Advanced Features:** Proactive AI, Smart Alerts.

4.  [**Prototype Source Code**](./frontend/)
    *   **Tech Stack:** React (Vite) + Tailwind CSS + Lucide Icons.
    *   **Location:** `frontend/` directory.

## Getting Started

This workspace is set up to facilitate the end-to-end development process:
*   **Concept & Design:** Refine the `docs/` as needed.
*   **Planning:** Use the roadmap in the Concept document to track progress.
*   **Implementation:** Source code is located in `frontend/`.
*   **Run Prototype:**
    ```bash
    cd frontend
    # npm install (already installed)
    npm run dev
    ```

---
*HR.ai - Transforming Workforce Management with Intelligence.*
