const container=document.querySelector(".container");
const count=document.getElementById("count");
const amount=document.getElementById("amaount");
const select=document.getElementById("movie");
const seats=document.querySelectorAll(".seat:not(.reserved)");

getFromLocalStorage();
calculateTotal();

container.addEventListener("click",function(e){
    if(e.target.classList.contains("seat") && !e.target.classList.contains("reserved")){
        e.target.classList.toggle("selected");
        calculateTotal();
    }
});

//toggle() fonksiyonu : Html öğesi görünür durumdaysa gizlemeyi, gizli durumdaysa görünür hale getirmemizi sağlar.
//addEventListener yöntemi, bir kullanıcı bir düğmeyi tıkladığında olduğu gibi, belirli bir olay gerçekleştiğinde çağrılacak işlevleri ayarlamanıza olanak tanır.
//function fonksiyonunda seat içeren class'ı ve reserved olmayan seçeneklere tıklanmasını aktif etmektedir.

select.addEventListener("change",function(e){
    calculateTotal();
})

function calculateTotal(){  
    const selectedSeats=container.querySelectorAll(".seat.selected");

    const selectedSeatsArr=[];
    const seatArr=[];

    selectedSeats.forEach(function(seat){
        selectedSeatsArr.push(seat);
    });

    seats.forEach(function(seat){
        seatArr.push(seat);
    });

    //[1,3,5] seçilen elemanın kaıncı indexi döndür.
    let selectedSeatIndexs=selectedSeatsArr.map(function(seat){
        return seatArr.indexOf(seat);
    });

    let selectedSeatCount=selectedSeats.length;
    amount.innerText= (selectedSeatCount * select.value);

    saveToLocalStorage(selectedSeatIndexs);
}

function getFromLocalStorage(){
    const selectedSeats=JSON.parse(localStorage.getItem('selectedSeats'));
    
    if(selectedSeats !=null && selectedSeats.length>0){ 
        seats.forEach(function(seat,index){
            if(selectedSeats.indexOf(index)>-1){
                seat.classList.add("selected");
            }
        })
    }
    const selectedMovieIndex=localStorage.getItem('selectedMovieIndex');

    if(selectedMovieIndex !=null){
        select.selectedIndex=selectedMovieIndex;
    }
}


function saveToLocalStorage(indexs){
    localStorage.setItem("selectedSeats",JSON.stringify(indexs));
    localStorage.setItem("selectedMovieIndex",select.selectedIndex);
}