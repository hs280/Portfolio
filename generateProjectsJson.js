const fs = require('fs-extra');
const path = require('path');

const projectsDir = path.join(__dirname, 'public', 'projects');
const outputFile = path.join(__dirname, 'public', 'projects.json');

async function generateProjectsJson() {
  try {
    const projects = [];
    const projectFiles = await fs.readdir(projectsDir);

    // Filter for markdown files
    const mdFiles = projectFiles.filter(file => file.endsWith('.md'));

    for (const mdFile of mdFiles) {
      const projectName = path.basename(mdFile, '.md');
      const imagePath = `${projectName}_image.svg`;

      // Check if corresponding image exists
      if (projectFiles.includes(imagePath)) {
        projects.push({
          name: projectName.replace(/_/g, ' '), // Convert underscores to spaces if needed
          path:  `/projects/${projectName}`,
          image:  `/projects/${imagePath}`
        });
      }
    }

    await fs.writeJson(outputFile, projects, { spaces: 2 });
    console.log('projects.json generated successfully');
    console.log('Generated projects:', projects);
  } catch (error) {
    console.error('Error generating projects.json:', error);
  }
}

generateProjectsJson();
