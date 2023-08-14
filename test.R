library(shiny)
library(bslib)
library(magrittr)

theme_test <- bs_theme(version = 5,
                       primary = "#d83e3e")

ui <- navbarPage(title = "Test", theme = theme_test,
                 tabPanel("Plot",
                          sidebarLayout(
                              sidebarPanel(
                                  radioButtons("plotType", "Plot type",
                                               c("Scatter"="p", "Line"="l")
                                  )
                              ),
                              mainPanel(
                                  plotOutput("plot")
                              )
                          )
                 ),
                 tabPanel("Summary",
                          p('summary')
                 ))

server <- function(input, output) {}

shinyApp(ui, server)