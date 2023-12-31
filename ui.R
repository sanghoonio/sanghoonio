library(shiny)
library(shinyjs)
library(bslib)

ui <- bootstrapPage(
    
    useShinyjs(),
    theme = bs_theme(version = 5),
    
    tags$head(
        tags$link(rel = 'stylesheet', type = 'text/css', href = 'style.css')
    ),
    # tags$head(
    #     # tags$link(rel = 'stylesheet', type = 'text/css', href = 'all.min.css')
    #     tags$link(rel = 'stylesheet', type = 'text/css', href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css')
    # ),
    
    # tags$script(src = 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.0/jquery.min.js'),
    tags$script(src = 'script.js'),

    tags$head(tags$link(rel = 'icon', type = 'image/x-icon', href = '/favicon.ico')),
    tags$head(tags$link(rel = 'apple-touch-icon', sizes='180x180', href = '/apple-touch-icon.png')),
    tags$head(tags$link(rel = 'manifest', href = '/site.webmanifest')),
    tags$head(tags$title('Sam Park')),
    tags$head(tags$meta(name='theme-color', content='#E9E4F2')),
    
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
                            class = 'row container-fluid body-container',
                            div(
                                class = 'container-fluid body-header col-md-8',
                                h4('About'),
                                div(
                                    class = 'container-fluid body-about',
                                    p('I am an engineer with a B.S. in biomedical engineering and a minor in computer science from UVA. As a student, I was able to discover my interest in applying data science and computational modeling to biology and genetics through my courses and various projects. These experiences have contributed to my excitement for a new priority in our field: personalized, data-driven medicine.'),
                                    p('Since graduating, I have worked with Merck as an automation engineer to support their Gardasil HPV vaccine production process and learn about the manufacturing side of the pharmaceutical industry while simultaneously pursuing my interests in genomics part-time with Predictiv Care Inc., whose mission is to provide a novel DNA-based digital twin service by incorporating our genetic data.'),
                                ),
                                div(
                                    class = 'container-fluid body-interests',
                                    h4('Interests'),
                                    p('Genetics and Bioinformatics'),
                                    p('Data Science and Visualization'),
                                    p('Design Intuition'),
                                    p('Nature Observation'),
                                ),
                                div(
                                    class = 'container-fluid body-contact',
                                    a(
                                        href = 'https://github.com/sanghoonio',
                                        icon(name = 'square-github')
                                    ),
                                    a(
                                        href = 'https://www.linkedin.com/in/sanghoonio/',
                                        icon(name = 'linkedin'),
                                    ),
                                    a(
                                        class = 'mail-link',
                                        href = '#',
                                        icon(name = 'square-envelope'),
                                    )
                                )
                            ),
                            div(
                                class = 'container-fluid body-image col-md-4',
                                img(src = 'graphics/graphics/graphics.007.png'),
                            )
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
                        id = 'collapse_parent',
                        div(
                            class = 'row text-center hand',
                            h3('Notes to review:')
                        ),
                        div(
                            class = 'row',
                            div(
                                class = 'col-12 col-md-4 order-1 portfolio-card',
                                a(class = 'action-button shiny-bound-input portfolio-card-a',
                                  id = 'genomics',
                                  href = '#collapse_genomics',
                                  `data-bs-toggle` = 'collapse',
                                  `aria-expanded` = 'false',
                                  `aria-controls` = 'collapse_genomics',
                                  div(
                                      class = 'portfolio-card-body',
                                      img(class = 'card-img',
                                          src = 'graphics/graphics/graphics.004.png', 
                                      ),
                                      img(class = 'card-img-hover',
                                          src = 'graphics/graphics/graphics.005.png', 
                                      ),
                                      img(class = 'card-img-hover-arrow',
                                          src = 'graphics/graphics/graphics.006.png', 
                                      ),
                                      img(class = 'card-art',
                                          src = 'graphics/graphics/graphics.001.png', 
                                      ),
                                  ),
                                ),
                            ),
                            div(
                                class = 'col-12 col-md-4 order-md-2 order-3 portfolio-card',
                                a(class = 'action-button shiny-bound-input portfolio-card-a',
                                  id = 'pharma',
                                  href = '#collapse_pharma',
                                  `data-bs-toggle` = 'collapse',
                                  `aria-expanded` = 'false',
                                  `aria-controls` = 'collapse_pharma',
                                  div(
                                      class = 'portfolio-card-body',
                                      img(class = 'card-img',
                                          src = 'graphics/graphics/graphics.004.png', 
                                      ),
                                      img(class = 'card-img-hover',
                                          src = 'graphics/graphics/graphics.005.png', 
                                      ),
                                      img(class = 'card-img-hover-arrow',
                                          src = 'graphics/graphics/graphics.006.png', 
                                      ),
                                      img(class = 'card-art',
                                          src = 'graphics/graphics/graphics.002.png', 
                                      ),
                                  ),
                                ),
                            ),
                            
                            div(
                                class = 'col-12 col-md-4 order-md-3 order-5 portfolio-card',
                                a(class = 'action-button shiny-bound-input portfolio-card-a',
                                  id = 'metabolic',
                                  href = '#collapse_metabolic',
                                  `data-bs-toggle` = 'collapse',
                                  `aria-expanded` = 'false',
                                  `aria-controls` = 'collapse_metabolic',
                                  div(
                                      class = 'portfolio-card-body',
                                      img(class = 'card-img',
                                          src = 'graphics/graphics/graphics.004.png', 
                                      ),
                                      img(class = 'card-img-hover',
                                          src = 'graphics/graphics/graphics.005.png', 
                                      ),
                                      img(class = 'card-img-hover-arrow',
                                          src = 'graphics/graphics/graphics.006.png', 
                                      ),
                                      img(class = 'card-art',
                                          src = 'graphics/graphics/graphics.003.png', 
                                      ),
                                  ),
                                ),
                            ),
                            div(
                                class = 'col-12 order-md-4 order-2 portfolio-collapse',
                                div(
                                    class = 'collapse portfolio-collapse-body',
                                    id = 'collapse_genomics',
                                    `data-bs-parent` = '#collapse_parent',
                                    uiOutput('genomics_body')
                                )
                            ),
                            div(
                                class = 'col-12 order-md-5 order-4 portfolio-collapse',
                                div(
                                    class = 'collapse portfolio-collapse-body',
                                    id = 'collapse_pharma',
                                    `data-bs-parent` = '#collapse_parent',
                                    uiOutput('pharma_body')
                                )
                            ),
                            div(
                                class = 'col-12 order-5 portfolio-collapse',
                                div(
                                    class = 'collapse portfolio-collapse-body',
                                    id = 'collapse_metabolic',
                                    `data-bs-parent` = '#collapse_parent',
                                    uiOutput('metabolic_body')
                                )
                            ),
                        ),
                    )
                )
            )
        )
    )
)