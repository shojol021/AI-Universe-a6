const fetchData = async () => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    const res = await fetch(url);
    const info = await res.json();
    loadData(info.data.tools);

}

// ================================= Load Data 2 ======================================
const loadData = (tools, isSorted = false) => {

    document.getElementById('tools-container').innerHTML = '';

    // ========== Sorting array by date ===========
    if (isSorted){
        tools = tools.sort((a, b) => {
            const dateA = new Date(a.published_in);
            const dateB = new Date(b.published_in);
            return dateA - dateB;
          });
    }
    
    const toolsContainer = document.getElementById('tools-container');
    // tools = tools.slice(0, 6);

    // =============== loop ==================
    tools.forEach(element => {
        // console.log(element)
        
        const div = document.createElement('div');
        div.classList.add('card', 'w-11/12', 'bg-base-100', 'shadow-xl');
        div.innerHTML = `
            <figure> <img src=${element.image} alt="Shoes" /></figure>
            <div class="card-body">
                <h2 class="card-title">
                    Features!
                    <div class="badge badge-secondary">NEW</div>
                </h2>
                    <ol class="list-decimal list-inside">
                        ${element.features.map(feature => `<li>${feature}</li>`).join("")}
                    </ol>
                    <hr>  
                    <div class="flex flex-row justify-between">
                        <div>
                            <h1 class="font-bold text-2xl">${element.name}</h1>
                            <h1>${element.published_in}</h1>
                        </div>
                        <div onclick="fetchSingleTool('${element.id}')" class="my-auto">
                                <label for="loadToolModal" class="text-2xl bg-red-100 hover:bg-red-300 text-red-800 font-bold py-1 px-2 rounded-full">
                                    <i class="fa-solid fa-arrow-right"></i>
                                </label>
                            
                        </div>
                    </div>
            </div>
        `;
        toolsContainer.appendChild(div);

    });
    // =============== loop End ================

}

// ================================= Load Data 2 End ======================================


document.getElementById('btn-sort').addEventListener('click', async function(){
    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    const res = await fetch(url);
    const info = await res.json();
    loadData(info.data.tools, isSorted = true);
})


const fetchSingleTool = async id => {
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
    const res = await fetch(url);
    const info = await res.json();
    loadSingleTool(info.data);
}

const loadSingleTool = (tool) => {
    console.log(tool)

    document.getElementById('headline').innerText = tool.description;
    document.getElementById('img').src = tool.image_link[0];
    document.getElementById('input').innerText = tool.input_output_examples[0].input;
    document.getElementById('output').innerText = tool.input_output_examples[0].output;
    const features = document.getElementsByClassName('features');
    const integrations = document.getElementsByClassName('integrations');
    let i=1;
    for (const feature of features){
        // console.log(feature.innerText, i);
        feature.innerText = tool.features[i].feature_name;
        i++;
    }
    let j=0;
    for (const integration of integrations){
        // console.log(feature.innerText, i);
        integration.innerText = tool.use_cases[j].name;
        j++;
    }

}


fetchData();