const deptdiv = document.querySelector(".depts");

const deptdivAdd = (id, name) => {
    const deptContainer = document.createElement("div");
    const deptImg = document.createElement("img");
    const deptPara = document.createElement("p");

    deptContainer.classList.add("deptcont");
    deptImg.classList.add("deptimg");
    deptImg.src = `https://picsum.photos/id/${id}/200/300`; 
    deptPara.innerHTML = name;

    deptContainer.addEventListener("click", () => {
        openDeptPage(id);
    });

    deptContainer.appendChild(deptImg);
    deptContainer.appendChild(deptPara);
    deptdiv.appendChild(deptContainer);
}

function openDeptPage(id) {
    fetch(`https://openday.kumaraguru.in/api/v1/department/${id}`) 
        .then(result => result.json())
        .then(result => {
            console.log(result);

            localStorage.setItem("storageName", JSON.stringify(result));
            window.location.href = "department.html";
        })
        .catch(e => console.log(e))
}

let curpage = 1;
const deptlst = [];
const pagebtns = document.querySelectorAll(".page-btn");
const pageleft = document.getElementById("page-left");
const pageright = document.getElementById("page-right");

pageleft.addEventListener("click", function () {
    if (curpage != 1) {
        pageSelector(curpage - 1, deptlst, 0);
    }
});

pageright.addEventListener("click", function () {
    if (curpage != 10) {
        pageSelector(curpage + 1, deptlst, 0);
    }
});

pagebtns.forEach((element, index) => {
    element.addEventListener("click", function () {
        pageSelector(index + 1, deptlst, 0);
    })
});

function pageSelector(page, list, isSearch) {
    deptdiv.innerHTML = "";
    let start = (page - 1) * 100;
    let last = start + 100;
    if (isSearch && list.length != 1000) {
        for (let i = 0; i < list.length; i++) {
            deptdivAdd(list[i].id, list[i].name);
        }
        return;
    } else {
        pagebtns[curpage - 1].classList.remove("active");
        curpage = page;
        pagebtns[page - 1].classList.add("active");

        for (let i = start; i < last; i++) {
            if (i < list.length) {
                deptdivAdd(list[i].id, list[i].name);
            }
        }
    }
}

function fetchDepartments() {
    fetch("https://openday.kumaraguru.in/api/v1/departments")
        .then((response) => response.json())
        .then((result) => {
            const departments = result;
            for (let i = 0; i < departments.length; i++) {
                deptlst.push(departments[i]);
            }

            pageSelector(1, deptlst, 0);
        })
        .catch((error) => console.error(error));
}

fetchDepartments();

const banimg = [];
const banner = document.getElementById("ban");
const bannerLeftBtn = document.querySelector(".banbtn-left");
const bannerRightBtn = document.querySelector(".banbtn-right");
let banid = 0;

bannerLeftBtn.addEventListener("click", function () {
    setBanner(0);
})

bannerRightBtn.addEventListener("click", function () {
    setBanner(1);
})

const setBanner = (id) => {
    if (id) {
        if (banid == 5) {
            banid = -1;
        }
        banid++;
    } else {
        if (banid == 0) {
            banid = 6;
        }
        banid--;
    }
    banner.src = `https://picsum.photos/id/${banid}/1080/720`; 
}

fetch("https://openday.kumaraguru.in/api/v1/get_banner_images")
    .then((response) => response.json())
    .then((result) => {
        for (let i = 0; i < result.length; i++) {
            banimg.push(result[i]);
        }
    })
    .catch((e) => console.log(e))

const searchBox = document.getElementById("search");

searchBox.addEventListener('input', () => {
    const search = searchBox.value.toLowerCase();
    console.log(search);

    const results = deptlst.filter(element => element.name.toLowerCase().includes(search));
    pageSelector(curpage, results, 1);
    console.log(results);
})


 
