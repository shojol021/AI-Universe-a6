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
                            <h1>${element.date}</h1>
                        </div>
                        <div class="card-actions my-auto">
                            <i id=${element.id} class="fa-solid fa-arrow-right"></i>
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

fetchData();