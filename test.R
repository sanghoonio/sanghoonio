library(shiny)
library(bslib)
library(magrittr)

theme_test <- bs_theme(version = 5,
                       primary = "#d83e3e")

ui <- navbarPage(title = "Test",
                 
                 tags$script(src = 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.0/jquery.min.js'),
                 tags$script(HTML("$(function () {

    $(window).bind('resize', function () {
        console.log($(this).width())
        if ($(this).width() < 500) {
            $('div').removeClass('yellow').addClass('red')
        } else {
            $('div').removeClass('red').addClass('yellow')
        }
    }).trigger('resize');
})"
                 )),
                 
                 
                 tabPanel("Plot",
                          sidebarLayout(
                              sidebarPanel(
                                  radioButtons("plotType", "Plot type",
                                               c("Scatter"="p", "Line"="l")
                                  )
                              ),
                              mainPanel(
                                  div(class = 'yellow'),
                                  plotOutput("plot")
                              )
                          )
                 ),
                 tabPanel("Summary",
                          p('summary')
                 ))

server <- function(input, output) {}

shinyApp(ui, server)