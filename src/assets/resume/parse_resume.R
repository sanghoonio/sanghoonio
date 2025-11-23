# Install and load required packages
if (!requireNamespace('pdftools', quietly = TRUE)) install.packages('pdftools')
if (!requireNamespace('jsonlite', quietly = TRUE)) install.packages('jsonlite')
library(pdftools)
library(jsonlite)

# Function to parse PDF
parse_resume_pdf <- function(pdf_path) {
  # Extract text from PDF
  raw_text <- pdf_text(pdf_path)
  
  # Combine all pages into a single string
  full_text <- paste(raw_text, collapse = '\n')
  
  # Split text into lines
  lines <- strsplit(full_text, '\n')[[1]]
  
  # Initialize sections
  sections <- list(
    # contact = character(),
    education = character(),
    experience = character(),
    # projects = character(),
    skills = character()
  )
  
  # Parse sections
  current_section <- 'contact'
  for (i in seq_along(lines)) {
    line <- lines[i]
    if (grepl('education', tolower(line))) {
      current_section <- 'education'
    } else if (grepl('experience', tolower(line))) {
      current_section <- 'experience'
    } else if (grepl('projects and awards', tolower(line))) {
      current_section <- 'projects'
    } else if (grepl('skills', tolower(line))) {
      current_section <- 'skills'
    } else {
      # Check the next line
      if (current_section == 'contact') {
        next
      }

      next_line <- if (i < length(lines)) lines[i + 1] else ''
      if (!grepl('^\\s+-', line) & grepl('^\\s+', line)) {
        line <- paste0(' ', trimws(line))
      }
      
      if ((!grepl('^-', trimws(line)) & !grepl('^\\s+-', line)) & grepl('\\s+', line)) {
        line_split <- strsplit(line, ' {5,}')[[1]]
        for (part in line_split) {
          sections[[current_section]] <- c(sections[[current_section]], part, "\n")
        }
      } else {
        if (grepl('^-', trimws(next_line)) | grepl('^\\s+-', next_line) | !grepl('^\\s+', next_line)) {
          sections[[current_section]] <- c(sections[[current_section]], line, "\n")
        } else {
          sections[[current_section]] <- c(sections[[current_section]], line)
        }
      }
    }
  }
  
  # Combine lines in each section
  for (section in names(sections)) {
    sections[[section]] <- paste(sections[[section]], collapse = '')
  }
  
  return(sections)
}

# Parse the PDF
resume_data <- parse_resume_pdf('../../../public/resume.pdf')

# Convert to JSON and save
json_data <- toJSON(resume_data, pretty = TRUE)
write(json_data, 'resume_data.json')

cat('Parsing complete. Data saved to resume_data.json\n')
