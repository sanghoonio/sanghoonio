library(shiny)
library(bslib)

ui <- bootstrapPage(
    
    theme = bs_theme(version = 5),
    
    tags$head(
        tags$link(rel = 'stylesheet', type = 'text/css', href = 'style.css')
    ),
    tags$head(
        # tags$link(rel = 'stylesheet', type = 'text/css', href = 'all.min.css')
        tags$link(rel = 'stylesheet', type = 'text/css', href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css')
    ),
    
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
                    class = 'tab-pane active show',
                    `data-value` = 'Home',
                    id = 'home',
                    role = 'tabpanel',
                    div(
                        class = 'col-sm-12',
                        div(
                            class = 'container-fluid body-header',
                            h2('hello!')
                        ),
                        div(
                            class = 'container-fluid body-text',
                            p('I am an engineer with a B.S. in biomedical engineering and a minor in computer science from UVA. As a student, I was able to discover my interest in applying data science and computational modeling to biology and genetics through my courses and various projects. These experiences have contributed to my excitement for a new priority in our field: personalized, data-driven medicine. Since graduating, I have worked with Merck as an automation engineer to support their Gardasil HPV vaccine production process and learn about the manufacturing side of the pharmaceutical industry while simultaneously pursuing my interests in genomics part-time with Predictiv Care Inc., whose mission is to provide a novel DNA-based digital twin service by incorporating our genetic data.')
                        ),
                        div(
                            class = 'container-fluid cv-header',
                            h2('CV')
                        ),
                        div(
                            class = 'container-fluid cv-category cv-category-first',
                            h4('Education')
                        ),
                        div(
                            class = 'row container-fluid',
                            div(
                                class = 'cv-item col-sm-8',
                                h6('University of Virginia, Charlottesville, Virginia')
                            ),
                            div(
                                class = 'cv-year col-sm-4',
                                h6('2018-2022')
                            )
                        ),
                        div(
                            class = 'container-fluid cv-details',
                            p('Bachelor of Science, Major: Biomedical Engineering | Minor: Computer Science'),
                            p('Coursework: Organic Chemistry I & II, Molecular Data Science, Physiology for Engineers, Cell & Molecular Biology for Engineers, BME Integrative Design & Experimental Analysis Lab I & II, Advanced Software Development, Program & Data Representation'),
                            p('GPA: 3.69/4.0')
                        ),
                        div(
                            class = 'container-fluid cv-category',
                            h4('Projects and Awards')
                        ),
                        div(
                            class = 'row container-fluid',
                            div(
                                class = 'cv-item col-sm-8',
                                h6('Automated Continuous Historian Tool')
                            ),
                            div(
                                class = 'cv-year col-sm-4',
                                h6('2023')
                            )
                        ),
                        div(
                            class = 'container-fluid cv-details',
                            p('- Helped lead Merck automation community project incorporating R Shiny, plumber, HTML/CSS, AWS, and PI Web API to automate the continuous historian report generation process, reducing the workload of 500+ reports needing to be manually written per year'),
                            p('- Developed initial functioning proof of concept that was used as baseline codebase to be iterated upon by team'),
                            p('- Explored GMP and regulatory process needed to document and test the tool before releasing the product')
                        ),
                        div(
                            class = 'row container-fluid',
                            div(
                                class = 'cv-item col-sm-8',
                                h6('Undergraduate BME Capstone Project')
                            ),
                            div(
                                class = 'cv-year col-sm-4',
                                h6('2021-2022')
                            )
                        ),
                        div(
                            class = 'container-fluid cv-details',
                            p('- Used genetic engineering to improve intracellular yields of acetyl-CoA and polyhydroxybutyrate in E. coli'),
                            p('- Applied CRISPR-Cas9 technology to genetically modify E. coli and verified metabolite yields with fluorescent assays'),
                            p('- Investigated the metabolic impacts of our gene modifications with genome-scale metabolic modeling in Python and MATLAB')
                        ),
                        div(
                            class = 'row container-fluid',
                            div(
                                class = 'cv-item col-sm-8',
                                h6('Harrison Undergraduate Research Award')
                            ),
                            div(
                                class = 'cv-year col-sm-4',
                                h6('2021')
                            )
                        ),
                        div(
                            class = 'container-fluid cv-details',
                            p('- Received a UVA-funded research grant for a proposal involving modeling cellular metabolism in inflammatory bowel disease'),
                            p('- Research incorporates patient gene expression data with genome-scale metabolic modeling to identify trends in disease'),
                            p('- Presented findings at the 2021 Annual BMES Conference and will attend the 2022 UVA Undergraduate Research Symposium')
                        ),
                        div(
                            class = 'container-fluid cv-category',
                            h4('Experience')
                        ),
                        div(
                            class = 'row container-fluid',
                            div(
                                class = 'cv-item col-sm-8',
                                h6('Automation Engineer, Merck & Co. (Contractor)')
                            ),
                            div(
                                class = 'cv-year col-sm-4',
                                h6('2022-Current')
                            )
                        ),
                        div(
                            class = 'container-fluid cv-details',
                            p('- Automation Support:'),
                            p(class = 'indent', '- Authored continuous historian reports with PI DataLink to support technical operations'),
                            p(class = 'indent', '- Helped initiate, author, and execute Site or Project Change Controls to update DeltaV and InfoBatch systems'),
                            p(class = 'indent', '- Assisted technical operations with troubleshooting general equipment issues or module testing during control loop tests'),
                            p(class = 'indent', '- Maintained control system accounts for users involved in the Gardasil purification process'),
                            p('- Data Science:'),
                            p(class = 'indent', '- Developed real-time PI ProcessBook displays to support technical operations with investigations'),
                            p(class = 'indent', '- Updated R scripts incorporating PI Web API to track site phosphate use and Gardasil purification process batch events'),
                            p(class = 'indent', '- Helped update frontend features of Shiny apps to improve aesthetics and usability')
                        ),
                        div(
                            class = 'row container-fluid',
                            div(
                                class = 'cv-item col-sm-8',
                                h6('R&D Intern, Predictiv Care, Inc.')
                            ),
                            div(
                                class = 'cv-year col-sm-4',
                                h6('2022-Current')
                            )
                        ),
                        div(
                            class = 'container-fluid cv-details',
                            p('- Pharmacogenomics (PGx):'),
                            p(class = 'indent', '- Wrote R scripts that identify customer drug metabolism phenotypes from variant call format files (WES or WGS) with data from the Clinical Pharmacogenetics Implementation Consortium (CPIC)'),
                            p(class = 'indent', '- Currently exploring knowledge graph models to visualize connections between variants and phenotypes for drug metabolism'),
                            p('- Polygenic Risk Scores (PRS):'),
                            p(class = 'indent', '- Wrote R scripts that incorporate published PRS models to calculate risk scores with customer variant call format files'),
                            p(class = 'indent', '- Currently exploring LDpred2 and other algorithms that take account of linkage disequilibrium to develop PRS models'),
                            p('- Additional Projects:'),
                            p(class = 'indent', '- Wrote R scripts that use 23andMe and AncestryDNA output files to identify important variants for customer Wellness reports'),
                            p(class = 'indent', '- Explored medical database APIs (MedGen, HPO) to help build medical familiarity and streamline in-house databases'),
                        ),
                        div(
                            class = 'container-fluid cv-category',
                            h4('Skills')
                        ),
                        div(
                            class = 'row container-fluid',
                            div(
                                class = 'cv-item col-sm-8',
                                h6('Programming')
                            ),
                            div(
                                class = 'cv-year col-sm-4',
                            )
                        ),
                        div(
                            class = 'container-fluid cv-details',
                            p('- Python, R, Unix, MATLAB, HTML/CSS, Git, Jupyter, JavaScript, Arduino'),
                        ),
                        div(
                            class = 'row container-fluid',
                            div(
                                class = 'cv-item col-sm-8',
                                h6('Technical')
                            ),
                            div(
                                class = 'cv-year col-sm-4',
                            )
                        ),
                        div(
                            class = 'container-fluid cv-details',
                            p('- Emerson DeltaV, OSIsoft PI, Informetric InfoBatch, AWS, PowerBI, ImageJ, Adobe Photoshop + InDesign, MS Office'),
                        ),
                    )
                ),
                
                div(
                    class = 'tab-pane',
                    `data-value` = 'Portfolio',
                    id = 'portfolio',
                    role = 'tabpanel',
                    div(
                        class = 'col-sm-12',
                        div(
                            class = 'container-fluid body-header',
                            style = 'height:100dvh',
                            h4('work in progress...')
                        )
                    )
                )
                
            )
        )
    )
)