library(shiny)
library(bslib)
library(shinyjs)

ui <- bootstrapPage(
    
    useShinyjs(),
    theme = bs_theme(version = 5),
    
    tags$head(
        tags$link(rel = 'stylesheet', type = 'text/css', href = 'style.css')
    ),
    tags$head(
        # tags$link(rel = 'stylesheet', type = 'text/css', href = 'all.min.css')
        tags$link(rel = 'stylesheet', type = 'text/css', href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css')
    ),
    
    tags$head(tags$link(rel = 'icon', type = 'image/x-icon', href = '/favicon.ico')),
    tags$head(tags$link(rel = 'apple-touch-icon', sizes='180x180', href = '/apple-touch-icon.png')),
    tags$head(tags$link(rel = 'manifest', href = '/site.webmanifest')),
    tags$head(tags$title('Sam Park')),
    
    div(
        id = 'wrapper',
        class = 'wraper',
        includeHTML('www/navbar.html'),
        div(
            id = 'content',
            div(
                class = 'tab-content',
                `data-tabsetid` = '0000',
                
                div(
                    class = 'tab-pane active show home',
                    `data-value` = 'Home',
                    id = 'home',
                    role = 'tabpanel',
                    div(
                        class = 'col-sm-12',
                        div(
                            class = 'container-fluid body-container',
                            div(
                                class = 'container-fluid body-header',
                                h3('hello!')
                            ),
                            div(
                                class = 'row container-fluid',
                                div(
                                    class = 'container-fluid body-text col-sm-8',
                                    style = 'z-index: 1;',
                                    p('I am an engineer with a B.S. in biomedical engineering and a minor in computer science from UVA. As a student, I was able to discover my interest in applying data science and computational modeling to biology and genetics through my courses and various projects. These experiences have contributed to my excitement for a new priority in our field: personalized, data-driven medicine. Since graduating, I have worked with Merck as an automation engineer to support their Gardasil HPV vaccine production process and learn about the manufacturing side of the pharmaceutical industry while simultaneously pursuing my interests in genomics part-time with Predictiv Care Inc., whose mission is to provide a novel DNA-based digital twin service by incorporating our genetic data.'),
                                    
                                ),
                                div(
                                    class = 'container-fluid body-text col-sm-4 sam',
                                    img(src = 'sam.png', align = 'left'),
                                )
                            ),
                        ),
                        includeHTML('www/cv.html'),
                    )
                ),
                
                div(
                    class = 'tab-pane portfolio',
                    `data-value` = 'Portfolio',
                    id = 'portfolio',
                    role = 'tabpanel',
                    div(
                        class = 'col-sm-12',
                        div(
                            class = 'row',
                            div(
                                class = 'container-fluid col-sm-12',
                                id = 'here',
                                uiOutput('modal')
                            )
                        ),
                        div(
                            class = 'row',
                            div(
                                class = 'col-sm-4 portfolio-card',
                                a(class = 'action-button shiny-bound-input',
                                  id = 'genomics',
                                  href = '#',
                                  div(
                                      class = 'portfolio-card-body',
                                      img(class = 'card-img',
                                          src = 'graphics/graphics/graphics.001.png', 
                                      ),
                                      img(class = 'card-img-hover',
                                          src = 'graphics/graphics/graphics.004.png', 
                                      ),
                                  ),
                                ),
                            ),
                            div(
                                class = 'col-sm-4 portfolio-card',
                                a(class = 'action-button shiny-bound-input',
                                  id = 'pharma',
                                  href = '#',
                                  div(
                                      class = 'portfolio-card-body',
                                      img(class = 'card-img',
                                          src = 'graphics/graphics/graphics.002.png', 
                                      ),
                                      img(class = 'card-img-hover',
                                          src = 'graphics/graphics/graphics.004.png', 
                                      ),
                                  ),
                                ),
                            ),
                            
                            div(
                                class = 'col-sm-4 portfolio-card',
                                a(class = 'action-button shiny-bound-input',
                                  id = 'metabolic',
                                  href = '#',
                                  div(
                                      class = 'portfolio-card-body',
                                      img(class = 'card-img',
                                          src = 'graphics/graphics/graphics.003.png', 
                                      ),
                                      img(class = 'card-img-hover',
                                          src = 'graphics/graphics/graphics.004.png', 
                                      ),
                                  ),
                                ),
                            ),
                        ),
                        
                    )
                )
                
            )
        )
    )
)