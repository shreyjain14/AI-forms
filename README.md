# AI GOOGLE FORMS ANSWERER

This is a Chrome extension that extracts questions from Google Forms and uses the Gemini generative AI model to generate answers.

## Installation

1. Clone the repository to your local machine.
2. Open Chrome and navigate to `chrome://extensions`.
3. Enable Developer Mode by clicking the toggle switch in the top right corner.
4. Click "Load Unpacked" and select the cloned repository folder.
5. The extension should now be installed and ready to use.

## Setup Backend

1. Go to `https://aistudio.google.com/apikey`
2. Create a new project and select "Generative AI" as the service.
3. Click "Enable API" and select "Gemini" from the list of models.
4. Copy the API key and paste it in the `backend/.env` file.

## Usage

1. Open a Google Form in your browser.
2. Click the extension icon in the top right corner of the page.
3. Click the Button to get answers.
4. The extension will extract the questions from the form and send them to Gemini.
5. Gemini will generate an answer based on the provided questions.
6. The extension will display the generated answer.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request on the GitHub repository.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
