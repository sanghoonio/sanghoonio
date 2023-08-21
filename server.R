library(shiny)
library(shinyjs)

server <- function(input, output, session) {
    
    modal_html <- ''
    
    observeEvent(input$genomics, {
        # modal_html <<- p('genomics')
        # output$modal <- renderUI({
        #     modal_html
        # })
        showModal(modalDialog(
            title = 'genomics',
            'genomics placeholder',
            easyClose = TRUE,
            footer = NULL
        ))
        print('genomics')
    })
    
    observeEvent(input$pharma, {
        # modal_html <<- p('pharma')
        # output$modal <- renderUI({
        #     modal_html
        # })
        showModal(modalDialog(
            title = 'pharma',
            'pharma placeholder',
            easyClose = TRUE,
            footer = NULL
        ))
        print('pharma')
    })
    
    observeEvent(input$metabolic, {
        # modal_html <<- p('metabolic')
        # output$modal <- renderUI({
        #     modal_html
        # })
        showModal(modalDialog(
            title = 'metabolic',
            'metabolic placeholder',
            easyClose = TRUE,
            footer = NULL
        ))
        print('metabolic')
    })
    
}