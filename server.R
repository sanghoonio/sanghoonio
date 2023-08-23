library(shiny)
library(shinyjs)

server <- function(input, output, session) {
    
    collapse_body_html <- ''
    
    observeEvent(input$genomics, {
        # collapse_html <<- p('genomics')
        # output$collapse_body <- renderUI({
        #     collapse_html
        # })
        print('genomics')
    })
    
    observeEvent(input$pharma, {
        # collapse_html <<- p('pharma')
        # output$collapse_body <- renderUI({
        #     collapse_html
        # })
        print('pharma')
    })
    
    observeEvent(input$metabolic, {
        # collapse_html <<- p('metabolic')
        # output$collapse_body <- renderUI({
        #     collapse_html
        # })
        print('metabolic')
    })
    
}