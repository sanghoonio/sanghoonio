library(shiny)
library(shinyjs)
library(data.table)

server <- function(input, output, session) {
    
    genomics_clicked <- reactiveVal(FALSE)
    pharma_clicked <- reactiveVal(FALSE)
    metabolic_clicked <- reactiveVal(FALSE)
    
    observeEvent(input$genomics, {
        
        if (!genomics_clicked()) {
            output$genomics_body <- renderUI({
                div(
                    class = 'portfolio-container',
                    h4('Why genomics?'),
                    p('Genomics and bioinformatics, as fields that offer insight into our molecular blueprints, lie at the forefront of modern medicine. Advancements in sequencing and computing technologies have allowed us to process individual genomes at a tiny fraction of the cost and time it took to do so several decades ago, making precision medicine accessible to more people than ever before. Unlike with traditional medicine, studying our genomes allows us to investigate how differences in our DNA and ancestry make us more susceptible to diseases ranging from hereditary cancers to neurological disorders, and also how our bodies react to and work with the medications used for treating those conditions. Doctors will be more readily able to prescribe targeted medications at appropriate dosages to reduce the risk of medication errors and improve treatment. Moreover, we can investigate how our genetics affect not only how traits such as blood pressure and cholesterol levels manifest physically but also how they affect our risk for more serious conditions, allowing us to offer and follow more personalized health guidelines with confidence. The following sections outline what I have been able to explore in my time working with the NGS data pipeline at Predictiv Care.'),
                    h5('1. Understanding and processing the data'),
                    p('The size of the human genome in its entirety is about 3 billion nucleotides – 6 feet long when stretched out from a single cell, or about three to four gigabytes on a computer. Processing this data to give us the medically relevant findings in each genome through next generation sequencing involves several steps: '),
                    p('a. The physical DNA sample is prepared and given to the sequencer. As the nucleotide bases are read in, the sequencer outputs raw data in the form of a .fastq file that includes base calls and their corresponding quality scores. It is important to keep in mind that when the sample is read by the sequencer, it is not read in as a single continuous chain of nucleotides but instead as many separate reads that result from amplifying DNA fragments as part of library preparation. Cutting the DNA into fragments prior to sequencing allows the sequencer to read millions of smaller fragments at once, which brings the sequencing time for the human genome down from 13 years to a single day. In order to make these fragment reads usable, they must be aligned to a reference human genome that allows for determining the correct positions of each nucleotide and the resulting full sequence of the entire sample. The resulting file is a .bam file, which contains information on the sample and the alignment details of each read.'),
                    p('b. With a .bam file, the next step is to perform variant calling, which specifically looks for differences in the sample from the reference genome. The output from this step is a .vcf file, which contains all the genetic variants, usually in the form of single nucleotide polymorphisms (SNPs), in the sample. Finally, the last step is to annotate the .vcf file by associating each variant with biologically significant details such as the type of mutation it is and whether it is intronic or exonic, and also with more downstream details including the variant’s population frequency, predicted pathogenicity, or protein impact. One of the more important types of annotations is associating variants with the phenotypes they result in. Numerous studies have already published findings linking variants to phenotypes and conditions. Likewise, there are a few databases that aggregate these findings for many known phenotypes and databases include ClinVar, Human Phenotype Ontology (HPO), Monarch Disease Ontology (MONDO), and Online Mendelian Inheritance in Man (OMIM), which can simply be called to with API calls to associate phenotypes to variants present in a sample.'),
                    
                    div(
                        class = 'row fig-container-npd',
                        div(
                            class = 'col-12 col-md-6 fig-div',
                            img(class = 'fig-side-lg',
                                src = 'graphics/figures/figures.001.png', 
                            ),
                        ),
                        div(
                            class = 'col-12 col-md-6 fig-div',
                            img(class = 'fig-side-lg',
                                src = 'graphics/figures/figures.002.png', 
                            ),
                        ),
                        span(class = 'caption', 'Fig 1. Summary of NGS sequencing process'),
                    ),
                    
                    h5('2. Identifying key traits and health risks'),
                    p('Identifying key health risks from a DNA sample can be done with an annotated .vcf file and several clinical databases or references of variants that are known to be associated with traits and conditions. While samples can be annotated with the phenotypes they are associated with from databases like MONDO or OMIM, these databases do not classify the type or strength of association variants have with their phenotypes. Genetic variants can be as protective to a condition as they are pathogenic to, and so additional databases including ClinGen and American College of Medical Genetics (ACMG) need to supplement the annotations produced earlier. Depending on the number of and agreement between contributing studies for these variants, ClinGen and ACMG classify their variants into categories of association such as “pathogenic”, “protective”, “uncertain significance”, “affects”, “association”, or “benign”. As for associating these classifications to present variants in the sample, ACMG and ClinGen refer to databases like MONDO and OMIM as well and we can simply perform a match in between the sample and ACMG/ClinGen guidelines with ontology phenotype IDs to provide the classification.'),
                    
                    div(
                        class = 'row fig-container-npd',
                        div(
                            class = 'col-12 fig-div',
                            img(class = 'fig-mid',
                                src = 'graphics/figures_wide/figures_wide.001.png', 
                            ),
                            span(class = 'caption', 'Fig 2. Additional .vcf annotation with ACMG and ClinGen'),
                        ),
                    ),
                    
                    br(),
                    h5('3. Applying pharmacogenomics guidelines'),
                    p('As with identifying genetic variants for health conditions, we can also identify variants in genes involved in drug metabolism and response. The Clinical Pharmacogenetics Implementation Consortium (CPIC) serves as a major resource for aggregating the clinical literature surrounding these variants. As of fall 2023, CPIC includes 16 genes in its guidelines and identifies specific variants for these genes with “star alleles”, which are named using a star (*) followed by a number (e.g., *1, *2, *3, etc.). The star allele nomenclature standardizes patterns of variants that occur across individuals and their studied impacts on individual drugs so that we can simply determine the star alleles for 16 CPIC genes in and individual and reference the guidelines to determine how an individual is likely to respond to specific drugs. In application, this can be accomplished by determining from the .vcf file which star alleles the sample possess, and then referencing from the CPIC guidelines the phenotypes of drug metabolism and response the matched star alleles correspond to. This analysis for a DNA sample will contain the matched star alleles for only 16 CPIC genes, but these select genes contribute significantly to varying responses towards hundreds of different drugs.'),
                    
                    div(
                        class = 'col-12 text-center',
                        div(
                            class = 'table-div',
                            tableOutput('pgx'),
                        ),
                        
                        div(
                            class = 'caption-details text-start',
                            p(strong('Plavix (Clopidogrel):'), 'Patients carrying the CYP2C19*2 allele in combination with a no, decreased, normal, or increased function allele who are treated with clopidogrel may have decreased platelet inhibition and increased residual platelet aggregation as compared to patients with two normal function alleles.'),
                            p(strong('Strattera (Atomoxetine):'), 'Patients carrying the CYP2C19*2 allele in combination with a no, decreased, normal, or increased function allele may have decreased metabolism of dexlansoprazole as compared to patients with two normal function alleles.'),
                        ),
                        
                        span(class = 'caption', 'Fig 3. Star allele calls from my DNA sample and selected matched CPIC guidelines'),
                    ),
                    
                    br(),
                    h5('4. Exploring polygenic risk scores'),
                    p('The first two applications of genetic data are largely concerned with identifying the presence of known individual variants in samples and determining whether they contribute to health conditions or drug response traits in individuals. Polygenic risk scores are a relatively newer development in genomics and involve aggregating many variants correlated to a complex trait or expressed condition as a single numeric score that identifies the odds ratio of the individual possessing the overall trait or condition. While one’s risk for conditions such as breast cancer or coronary artery disease can be identified with some confidence with several variants in key genes, doing so in this way often does not maximize the risk explained for these conditions by genetics. Many complex phenotypes actually involve hundreds to thousands of genes, and given that many genes are not passed down in isolation but linked together due to their proximity on chromosomes, upwards of millions of variants can end up affecting a single phenotype. These variants are typically identified from genome-wide association studies (GWAS). We can then use algorithms such as LDpred2 or PRSice, which consider the linkage between genetic markers, to help estimate the contribution of each variant to the trait. From here, calculating one’s polygenic score for a given trait is as simple as adding up of the effect size of each variant multiplied by the number of alleles of that variant present in their genome. With population level data and metadata related to the trait of interest, we can then determine thresholds of scores that correlate to the occurrence or severity of that trait.'),
                    p('Polygenic risk score models can also be curated by hand, as is the case with the 12-SNP score for polygenic familial hypercholesterolemia (FH). While models like this one may lack additional contributing variants, the variants they do take into account are carefully selected and validated by researchers across several studies and cohort populations. The smaller models are also arguably easier to work with, as each included variant is more likely to contribute a clearly defined effect towards the score.'),
                    
                    div(
                        class = 'col-12 text-center',
                        div(
                            class = 'table-div',
                            tableOutput('fh'),
                        ),
                        
                        div(
                            class = 'caption-details text-center',
                            p(strong('Polygenic score:'), '0.943'),
                            p(strong('Decile 6:'), 'High risk for familial hypercholesterolemia of polygenic origin'),
                        ),
                        
                        span(class = 'caption', 'Fig 4. Score and variants matched in my DNA for the 12-SNP familial hypercholesterolemia polygenic score'),
                    ),
                    
                    br(),
                    div(
                        class = 'col-12 text-center predictiv-thanks',
                        h5('Special thanks to the team at Predictiv for providing the resources and opportunity to explore this field!'),
                        a(
                            href = 'https://www.predictivcare.com',
                            img(
                                style = 'max-width: 100%;',
                                src = 'https://static.wixstatic.com/media/5aed6e_84813a5453c34b329b0480d5a92926ae~mv2.png/v1/fill/w_396,h_130,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/predictiv_logo_hi_res.png',
                                alt = 'Predictiv'
                                ),
                        ),
                    )
                )
            })
            
            pgx <- fread('data/Star_Alleles.PRDV-R9PM-K45D-5938.txt')
            output$pgx <- renderTable(pgx, id = 'pgx', width = '100%')
            
            fh <- fread('data/PRDV-R9PM-K45D-5938_fh.txt')[1:12, 1:7]
            output$fh <- renderTable(fh, id = 'fh', width = '100%')

            genomics_clicked(TRUE)
            print('genomics')
        }
        
    })
    
    observeEvent(input$pharma, {
        
        if (!pharma_clicked()) {
            output$pharma_body<- renderUI({
                div(
                    class = 'portfolio-container',
                    h4('Pharmaceutical manufacturing'),
                    p('After getting my undergraduate degree, I had the opportunity to gain experience with Merck’s manufacturing division as part the automation team at Elkton, VA. Here, I quickly learned the importance of practical skills relative to book knowledge in industry. The manufacturing of pharmaceuticals, and by extension anything regulated by the FDA, is a highly regulated and stringent process informed by good manufacturing practices (GMPs). Batches must constantly be running to meet market demand all the while meeting strict quality control requirements that keep track of every detail at every step of the process to ensure the medications produced are safe to consume and lack contamination. A key element to this is the central automation system that facilitates and runs the recipes used by all the equipment at the factory. To keep batches consistent, nearly the entire manufacturing process of pharmaceuticals is controlled by programmed recipes that instruct valves to actuate at specific times, agitators and pumps to rotate at specific speeds for exact lengths of time, or tanks to pressurize and drain to specific pressure and weight setpoints. Furthermore, sensors and indicators are present on every piece of equipment to ensure that they not only received the command from the automation system, but did indeed follow through with the programmed recipe. The automation system manages these sensors as well, and records a continuous log of all the data from each equipment module throughout the batch procedure for quality control purposes.'),
                    h5('Automation support'),
                    p('The primary goals of the automation team at a manufacturing site are to ensure that the central automation system is constantly running as intended, and that changes are being made to the programmed recipes to reduce bottlenecks that bring the system down and ensure batches are manufactured as efficiently as possible while maintaining quality of the product. This automation system is managed by DeltaV software provided by Emerson, and it allows for operating equipment module controllers and their input/output subsystems, and also for batch control through each step of the process. While recipes are largely automated, there are key points in each batch that require periodic operator confirmation to ensure the system is in line with correct setpoints and parameters. There are cases when steps in the batch do not align with these required values and intervention from automation engineers is often required to help diagnose the root cause. If these causes are determined to be caused by a defect or inefficiency in the automation code, changes are made to the recipes to prevent these issues from occurring in future batches. Part of the GMPs that govern pharmaceutical manufacturing require that changes made to systems such as the automation system are documented and tested stringently prior to their execution. Work in manufacturing automation is dominated by the change control process, which define discrete stages of implementing the change that include updating requirement, design, and configuration specification documents to provide a reference for the change and testing the changes themselves through automation test specifications on the system prior to releasing the changes. I was able to work on several change controls to update recipe setpoints and alarm configurations to help smooth out inefficiencies in the recipe process.'),
                    p('A major component of the automation system I worked with is involved in generating batch end reports through InfoBatch software for each batch. Each batch procedure can have several individual components such as homogenization, filtration, fermentation, or crystallization that each require their own reports to outline the history of the recipe as it was executed. The reports are the exact reports that inform of the success of each step in each recipe of each batch to the FDA. Ensuring that the data on the reports originates from the batches they are from and that the specifications and formatting of all the data are vital to communicate a batch meets quality assurance requirements and can be sold. I have also worked on several change controls involved in updating batch report formatting and configuration parameters to ensure they generate, are formatted properly, and include the necessary data with each batch.'),
                    h5('Data science'),
                    p('One of the side effects of collecting data from each manufacturing batch is the sheer amount of data that gets recorded over time. While some of it is used to report on the main details of each batch in batch end reports, the more specific points of data can be used to confirm events during the batch if the initial data shown on the batch reports indicate inconclusive results. This often requires using custom SQL queries or PI server calls to search the historian databases and writing reports to summarize the data, resulting in a major time sink for automation engineers as we receive over requests 500 for these reports annually as a team. As a solution to this, I was able to help produce an internal app that automates most of this process with R shiny and PI web API. It incorporates a simple user interface built with HTML/CSS/JS that takes in several parameters such as the name of the requested modules and timestamps as input and produces a report with all the requested data. The backend incorporates an R plumber API endpoint that automatically searches for the data that fit the requested parameters and plots the tables with proper report headings and details for a .pdf output.'),
                    p('The data itself can also be used to facilitate proactive batch monitoring to help reduce the risk of downtime caused by failures. This not only helps to reduce the overall batch failure rate and improve efficiency, but also frees up additional automation resources dedicated for diagnosing and correcting batch failures. Having seen that avoiding batch failures to keep the manufacturing process running continuously is the baseline priority of the automation team and that no existing system was in place to use past manufacturing data to forecast future downtime occurrences, I saw an opportunity to incorporate machine learning and time series modeling with our data. Batch downtime can always be traced back to a root cause, whether it has to do with fluctuations in critical process parameters such as tank pressure or temperature, malfunctions in equipment modules, or operator error. As such, any patterns in the data can be explored to see if they correlate with the occurrence of failures. With the end goal of using past data as an input to models that produce a real-time estimate of the odds of the current batch going into failure, I am exploring these patterns and correlations using data analysis techniques such as dimensionality reduction on batch summary statistics and classification modeling.'),
                    
                    br(),
                    h6('No pictures or figures here... Merck IP is confidential...'),
                    
                )
            })
            pharma_clicked(TRUE)
            print('pharma')
        }
        
    })
    
    observeEvent(input$metabolic, {
        
        if (!metabolic_clicked()) {
            output$metabolic_body <- renderUI({
                div(
                    class = 'portfolio-container',
                    h4('Exploring metabolism with bioinformatics'),
                    p('When I was undergraduate, there was a lot of rising interest in the media surrounding the impact of our metabolism and gut microbiome on our overall health. At this point, I read through several books and articles on studies that claim that the gut microbiome, through its modulation of metabolites that help the gut, helps regulate our traits including diet, weight, mood, and stress levels. Included in these findings was the discovery that different compositions of intestinal gut bacteria are associated with different traits, and treatments such as fecal transplants that alter the gut microbiome composition of recipient can really result in improved health. I wanted to learn more about our metabolism and had the chance to get involved in research using RNA sequencing (RNAseq) data to explore cellular metabolism of the gut in inflammatory bowel disease.'),
                    h5('Project details'),
                    p('Inflammatory bowel disease (IBD) is a lifelong disease of the gut that affects millions of people across the world. Patients suffer through a cycle of inflammation, pain, and digestive issues that irritate and ulcerate the intestinal mucosa. While there are costly treatments like surgery, there is no targeted therapy specific to IBD. Especially concerning is that the incidence of IBD is increasing in developed countries while we continue to lack a concrete understanding of the pathologies surrounding the condition. Previous studies have looked into how changes in the commensal gut microbiome induced by antibiotics can worsen gut health. Alterations in microbiome composition lower the availability of metabolites that are used to aid in cellular metabolism in colonocytes, but it is not clear if these patterns are observed in IBD. For this research project, I used a combination of patient RNAseq gene expression analysis and metabolic modeling to get a better understanding of how IBD affects the gut at the cellular level. For the data, I used a published RNAseq dataset consisting of 226 pediatric rectal biopsy mucosal transcriptomes for 206 ulcerative colitis patients and 20 control patients.'),
                    p('The data as published comes unprocessed as FASTQ files straight from the Illumina high- throughput sequencer. In order to make this data useable, I had to quantify abundances of transcripts for each patient using Kallisto, which takes forward and reverse reads and pseudoaligns them to a reference genome (GRCh38), and then performs quantification. After this, I used R to quantify the transcripts at the gene level. I first generated a transcript-to-gene table with a reference transcriptome (GRCh38), and then used the tximport package to sort identified transcripts to corresponding genes. For use later with metabolic models, I used dplyr to manually sort transcript abundances in each patient to their corresponding gene expression levels. '),
                    p('Next, I used DESeq2 to analyze differences in gene expression across the patient groups. With a Wald test, I was able to find that genes involved in innate immunity, including those that encode for dual oxidases (DUOX2, DUOXA2) that help with reactive oxygen species production, and chemokine ligands (CXCL5, CXCL17, CXCR1) that help direct immune cells to where they are needed, were upregulated in IBD. I also performed a PERMANOVA test using the adonis package to determine differently expressed genes across control and IBD patients with multivariate significance. Interestingly, while genes involved in active immunity and immunoglobulin production were upregulated in IBD patients as expected, most genes encoding for various mitochondrial complexes were downregulated. This hints at metabolic deficiencies within the IBD-affected gut, supporting the case for additional investigation with metabolic models.'),
                    
                    div(
                        class = 'row fig-container',
                        div(
                            class = 'col-12 col-md-6 fig-div',
                            img(class = 'fig-side',
                                src = 'figures/volcano.png', 
                            ),
                            span(class = 'caption', 'Fig 1. Volcano plot quantifying gene expression fold changes')
                        ),
                        div(
                            class = 'col-12 col-md-6 fig-div',
                            img(class = 'fig-side',
                                src = 'figures/permanova_barplot.png', 
                            ),
                            span(class = 'caption', 'Fig 2. Bar plot for gene expression differences from PERMANOVA')
                        ),
                    ),
                    
                    p('Genome-scale metabolic models are mathematical representations of an organism’s metabolism, containing all the known metabolic reactions that occur in the organism. These reactions, which are informed by the proteins (themselves informed by genes) in the organism that carry them out, are represented in the model as a collective matrix of stoichiometric coefficients that indicate whether their constituent metabolites are being produced or consumed (i.e. 1, -1), or absent (i.e. 0) in the model. The flow of metabolites, or flux, through these reactions can be determined by constraining reaction fluxes to represent environmental or induced conditions and using mathematical techniques to optimize the stoichiometric matrix to an objective function, such as maximizing biomass production. These objective functions are defined as a set of prioritized reactions in the model that can be altered to reflect the desired metabolic state. The solution to the optimization problem consists of a list of all reaction fluxes that characterize the state at which the organism’s metabolism is most attuned to the objective function. For most applications, metabolic models are built to represent a general organism for the species they represent, and so differences in gene expression (and constraints to reaction fluxes) across individuals are not readily represented. The key to applying metabolic models for a project like this is to personalize them for each patient with context from RNAseq data by constraining reactions fluxes to corresponding gene expression levels. To do this, I used the Gene Inactivity Moderated by Metabolism and Expression (GIMME) algorithm in Python. This algorithm essentially takes a generic metabolic model, which I have supplied Human-GEM 1.7.0 for, and removes reactions for genes that are expressed below a certain threshold. It then adds any reactions back that are necessary for the specified objective function and optimizes the updated model toward that objective, noting any discrepancies in gene expression levels and ability to carry out metabolic functions in an overarching inconsistency score for the model. For this project, maintained biomass production as the objective function to represent cell growth and survival.'),
                    p('After obtaining reaction fluxes from each patient, I performed principal component analysis on the data to determine whether clusters of patients could be identified by diagnosis, patterns in the metadata, or certain groups of reactions. The result indicated three distinct clusters that were not associated with diagnosis.'),
                    
                    div(
                        class = 'row fig-container',
                        div(
                            class = 'col-12 fig-div',
                            img(class = 'fig-mid-sm',
                                src = 'figures/pca.png', 
                            ),
                            span(class = 'caption', 'Fig 3. PCA plot indicating variance in metabolism across all patient samples')
                        ),
                    ),
                    
                    p('Grouping patients by metadata factors did not reveal any associations, but I did find that the clusters were largely separated by differences in fluxes across several transport reactions involved in moving metabolites in and out of the cell. The violin plots I produced below show considerable differences in flux for four transport reactions across the three cluster groups. This result suggests that there are differences in metabolism that go beyond an IBD diagnosis or any reported metadata associations. Differences in cofactor requirements caused by changes in metabolism may be a considerable in causing differences in metabolite uptake requirements.'),
                    p('In addition to these results, I visualized population differences in control and IBD patients with violin plots as well. As noted earlier with differences in mitochondrial gene expression, reactions for mitochondrial functions and the TCA cycle showed notably different patterns across groups. A considerable portion of IBD patients showed reduced magnitudes in flux for both ATP synthase and glutamate dehydrogenase, indicating reduced aerobic respiration in the IBD-affected gut. Additionally, IBD patients generally showed a considerable increase in flux magnitudes for most glycolysis reactions, suggesting that cells in these patients are compensating for impaired mitochondrial activity by upregulating glycolytic activity. This metabolic pattern is not only associated with impaired gut health caused by an altered gut microbiome composition as I described earlier, but with many other conditions as well. Known as the Warburg effect in cancer cells, this condition allows cells to avoid using aerobic respiration to preserve carbon for biomass production, which is essential for increased proliferation. It has been also observed in T cells as an alternative metabolic state induced by the mTOR signaling pathway. While there are many possible explanations to these results, identifying a definitive cause requires higher resolution in the data. Currently, these findings apply to somewhat of a mix of the cell types that were collected in the rectal biopsies, and it is unclear whether these metabolic patterns strictly apply to immune cells, epithelial cells, or more generally across the tissue. Using datasets that can differentiate gene expression levels across cell types in collected tissue samples can help determine what cell types see these changes in metabolism, and would be a suitable future direction for expanding upon the project.'),
                    
                    div(
                        class = 'row fig-container',
                        div(
                            class = 'col-12 col-md-6 fig-div',
                            img(class = 'fig-side-sm',
                                src = 'figures/violin_atp.png', 
                            ),
                            span(class = 'caption', 'Fig 4. Violin plot for ATP Synthase reaction.')
                        ),
                        div(
                            class = 'col-12 col-md-6 fig-div',
                            img(class = 'fig-side-sm',
                                src = 'figures/violin_gd.png', 
                            ),
                            span(class = 'caption', 'Fig 5. Violin plot for Glutamate Dehydrogenase reaction')
                        ),
                    ),
                    div(
                        class = 'row fig-container-bottom',
                        div(
                            class = 'col-12 fig-div',
                            img(class = 'fig-mid-sm',
                                src = 'figures/violin_glycolysis.png', 
                            ),
                            span(class = 'caption', 'Fig 6. Violin plots for Glycolysis reactions')
                        ),
                    ),
                )
            })
            metabolic_clicked(TRUE)
            print('metabolic')
        }
    })
}