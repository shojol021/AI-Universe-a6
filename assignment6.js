let showAllClicked = false;

const fetchData = async (limit) => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    const res = await fetch(url);
    const info = await res.json();
    loadData(info.data.tools, false, limit);

}

// ================================= Load Data 2 ======================================
const loadData = (tools, isSorted = false, limit = false,) => {
    console.log(tools);

    document.getElementById('tools-container').innerHTML = '';

    if(showAllClicked && !limit){
        limit = false;
    } else {
        limit = 6;
    }

    if(limit){
        tools = tools.slice(0, 6);
    }
    // ========== Sorting array by date ===========
    if (isSorted){
        tools = tools.sort((a, b) => {
            const dateA = new Date(a.published_in);
            const dateB = new Date(b.published_in);
            return dateA - dateB;
          });
    }
    
    const toolsContainer = document.getElementById('tools-container');

    // =============== loop ==================
    tools.forEach(element => {
        
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

// ================================= Load Data End ======================================


document.getElementById('btn-show-all').addEventListener('click', function(){
    showAllClicked = true;
    this.classList.add('hidden');
    fetchData()
})

document.getElementById('btn-sort').addEventListener('click', async function(){
    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    const res = await fetch(url);
    const info = await res.json();
    loadData(info.data.tools, isSorted = true);
})


// ================================ Load Individual Data in Modal ===============================
const fetchSingleTool = async id => {
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
    const res = await fetch(url);
    const info = await res.json();
    loadSingleTool(info.data);
}


const loadSingleTool = (tool) => {
    console.log(tool);

    document.getElementById('headline').innerText = tool.description;
    document.getElementById('img').src = tool.image_link[0];
    document.getElementById('input').innerText = tool.input_output_examples? `${tool.input_output_examples[0].input}` : 'No Data';
    document.getElementById('output').innerText = tool.input_output_examples? `${tool.input_output_examples[0].input}`: 'sample';
    const features = document.getElementsByClassName('features');
    const integrations = document.getElementsByClassName('integrations');
    const prices = document.getElementsByClassName('prices');
    const plans = document.getElementsByClassName('plans');
    let i=1;
    for (const feature of features){
        feature.innerText = tool.features[i].feature_name;
        i++;
    }
    let j=0;
    for (const integration of integrations){
        integration.innerText = tool.use_cases? `${tool.use_cases[j].name}`: 'no use case';
        j++;
    }

    let k = 0;
    for (const price of prices){
        if(tool.pricing === null){
            price.innerText = 'No Price Information';
        }
        else{
            price.innerText = tool.pricing[k].price == 'No cost' || tool.pricing[k].price == '0'? 'Free of cost' : `${tool.pricing[k].price}`;
        }
        k++;
    }

    let l = 0;
    for (const plan of plans){
        if(tool.pricing === null){
            plan.innerText = 'No package found'
        }
        else{
            plan.innerText = tool.pricing[l].plan;
        }
        l++;
    }

}

fetchData(6);