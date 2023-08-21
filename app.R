#
# This is a Shiny web application. You can run the application by clicking
# the 'Run App' button above.
#
# Find out more about building applications with Shiny here:
#
#    http://shiny.rstudio.com/
#

library(shiny)
library(shinyjs)
library(bslib)

options(shiny.port = 8080)

# Define UI for application that draws a histogram
source('ui.R', local = F)
source('server.R', local = F)

# Run the application 
shinyApp(ui = ui, server = server)
