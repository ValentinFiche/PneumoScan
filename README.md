# PneumoScan

## Description

This project involves training a machine learning model using a dataset that you will download and extract. Follow the instructions below to set up your environment, install the necessary dependencies, and start working with the model.

## Prerequisites

- Python 3.x
- `pip`
- `virtualenv`

## Setup

### Step 1: Create a Virtual Environment

To ensure that the project's dependencies are isolated from your global Python installation, create a virtual environment.

```sh
python -m venv env
```

### Step 2: Activate the Virtual Environment

Activate the virtual environment using the following commands:

- **Windows:**

  ```sh
  env\Scripts\activate
  ```

- **macOS/Linux:**
  ```sh
  source env/bin/activate
  ```

### Step 3: Install Dependencies

Install all the required Python packages using `pip` and the provided `requirements.txt` file.

```sh
pip install -r requirements.txt
```

## Dataset Preparation

1. **Download the Dataset:**

   - Go to [this link](https://epitechfr.sharepoint.com/sites/TDEV810/Documents%20partages/Forms/AllItems.aspx?csf=1&e=3ghePT&cid=ea197e66%2Db4bf%2D400f%2Dac8f%2D8ef373a04eb7&RootFolder=%2Fsites%2FTDEV810%2FDocuments%20partages%2Fdatasets&FolderCTID=0x0120001264F80C4FAD404A92DAFE76550B2DFC) and download the dataset file.

2. **Extract the Dataset:**
   - Extract the downloaded `.rar` file and rename the extracted folder to `dataset`.

## Running the Model

After setting up the environment and preparing the dataset, you can now run the Jupyter Notebook to train the model.

## Important Notes

- Ensure that the dataset is named exactly as `dataset` and is in the correct location relative to your project files. <span style="color:red">¡¡¡¡Important!!!!</span>
- Activate your virtual environment each time you work on this project to ensure all dependencies are correctly managed.
