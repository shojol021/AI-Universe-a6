const fetchData = async () => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    const res = await fetch(url);
    const info = await res.json();
    loadData(info.data.tools);

}

const loadData = (tools) => {
    console.log(tools);
    const toolsContainer = document.getElementById('tools-container');
    console.log(toolsContainer);

    tools.forEach(element => {
        console.log(element);
        const div = document.createElement('div');
        div.classList.add('card', 'w-11/12', 'bg-base-100', 'shadow-xl');
        div.innerHTML = `
            < figure > <img src=${element.image} alt="Shoes" /></figure>
            <div class="card-body">
                <h2 class="card-title">
                    Features!
                    <div class="badge badge-secondary">NEW</div>
                </h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <div class="card-actions justify-end">
                    <div class="badge badge-outline">Fashion</div>
                    <div class="badge badge-outline">Products</div>
                </div>
            </div>
        `;
        toolsContainer.appendChild(div);

    });

}

fetchData();