const propertiesJSON = [
    {
      name: "Country House",
      description: "A perfect place to run out from the city",
      src:
        "https://www.construyehogar.com/wp-content/uploads/2020/02/Dise%C3%B1o-casa-en-ladera.jpg",
      rooms: 2,
      surface: 170
    },
    {
      name: "Beach House",
      description: "Wake up with the sound of the waves.",
      src:
        "https://media.chvnoticias.cl/2018/12/casas-en-la-playa-en-yucatan-2712.jpg",
      rooms: 2,
      surface: 130
    },
    {
      name: "Downtown House",
      description: "Live in the heart of the city.",
      src:
        "https://fotos.perfil.com/2018/09/21/trim/950/534/nueva-york-09212018-366965.jpg",
      rooms: 1,
      surface: 80
    },
    {
      name: "Trailer",
      description: "A house that goes with you.",
      src:
        "https://cdn.bioguia.com/embed/3d0fb0142790e6b90664042cbafcb1581427139/furgoneta.jpg",
      rooms: 1,
      surface: 6
    },
    {
      name: "Apartment",
      description: "A perfect view of the city.",
      src:
        "https://www.adondevivir.com/noticias/wp-content/uploads/2016/08/depto-1024x546.jpg",
      rooms: 3,
      surface: 200
    },
    {
      name: "Mansion",
      description: "Luxury and elegance in one place.",
      src:
        "https://resizer.glanacion.com/resizer/fhK-tSVag_8UGJjPMgWrspslPoU=/768x0/filters:quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/CUXVMXQE4JD5XIXX4X3PDZAVMY.jpg",
      rooms: 5,
      surface: 500
    }
  ];

function createProperty(property){
    // first we need a div container for out property
    let prop_div = document.createElement('div');
    // adding the class
    prop_div.classList.add('property');
    // adding needed elements to show the property card
    prop_div.innerHTML = `
    <div class="prop-img"
      style="background-image: url('${property.src}')">
    </div>
    <section>
      <h5>${property.name}</h5>
      <div class="dflex justify-content-between">
        <p>Rooms: ${property.rooms}</p>
        <p>Surface (m): ${property.surface}</p>
      </div>
      <p class="my-3">${property.description}</p>
      <button class="btn btn-info">See more</button>
    </section>
    `;
    // returning the node
    return prop_div;
}

function defaultView() {
    let total = propertiesJSON.length;
    total_properties.innerText = total;
    // we need to clean the properties div
    while (properties_div.firstChild) properties_div.removeChild(properties_div.firstChild);

    propertiesJSON.forEach(property => {
        let prop_div = createProperty(property);
        properties_div.appendChild(prop_div);
    });
    // ensure that input labels are clear
    document.getElementById("rooms").value = '';
    document.getElementById("surf-min").value = '';
    document.getElementById("surf-max").value = '';
}

// some parent elements, to make my life easier
const total_properties = document.getElementById('total-properties');
const properties_div = document.getElementsByClassName('properties')[0];

// generating default view
defaultView();

// here the magic comes true
document.getElementById("filter-btn").addEventListener('click', () => {
    // get values to filter
    const rooms = parseInt(document.getElementById("rooms").value);
    const surf_min = parseInt(document.getElementById("surf-min").value);
    const surf_max = parseInt(document.getElementById("surf-max").value);

    // check if the user pass all the needed inputs
    if (!rooms && !surf_min && !surf_max) {
        alert('Missing input.');
        return;
    }

    // empty array to store all matching properties
    const properties = [];
    
    // loop over the properties array
    propertiesJSON.forEach(obj => {
        // check if property match the user conditions and add it to the array when match
        if ((obj.rooms >= rooms) && (obj.surface >= surf_min) && (obj.surface <= surf_max)) {
            properties.push(obj);
        }
    });
    
    // if we have at least one match
    if (properties.length) {
        // we need to clean the properties div
        while (properties_div.firstChild) properties_div.removeChild(properties_div.firstChild);
        properties.forEach(property => {
            // here we're creating the property container
            let prop_div = createProperty(property);
            properties_div.appendChild(prop_div);
        });
        total = properties.length;
        total_properties.innerText = total;
    } else {
        defaultView();
        alert('No matches for your search');
    }
});

document.getElementById('reset-btn').addEventListener('click', () => defaultView());
