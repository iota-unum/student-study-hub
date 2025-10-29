import { Project } from '../types';

/**
 * Loads and parses a JSON file containing an array of projects.
 * This function acts as a data abstraction layer.
 * @param file The JSON file to process.
 * @returns A Promise that resolves with an array of Project objects.
 * @throws An error if the file is not a valid JSON or doesn't match the expected structure.
 */
export const loadProjectsFromFile = (file: File): Promise<Project[]> => {
  return new Promise((resolve, reject) => {
    if (file.type !== 'application/json') {
      return reject(new Error('Invalid file type. Please upload a JSON file.'));
    }

    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        if (!content) {
            throw new Error('File is empty or could not be read.');
        }
        const data = JSON.parse(content);

        if (!Array.isArray(data)) {
          throw new Error('Invalid JSON structure. The root element must be an array of projects.');
        }

        // Here you could add more in-depth validation for each project object if needed
        
        resolve(data as Project[]);
      } catch (e) {
        if (e instanceof Error) {
          reject(new Error(`Failed to parse JSON: ${e.message}`));
        } else {
          reject(new Error('An unknown error occurred during JSON parsing.'));
        }
      }
    };

    reader.onerror = () => {
      reject(new Error('Failed to read the file.'));
    };

    reader.readAsText(file);
  });
};
