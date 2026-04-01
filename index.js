document.addEventListener("mousemove", (e) =>{
    const x = (e.clientX / window.innerWidth - 0.5) *20;
    const y = (e.clientY / window.innerHeight - 0.5) *20;
    
    document.body.style.backgroundPosition = `${50 + x}% ${50 + y}%`;
<<<<<<< HEAD
});



=======
});
>>>>>>> df0cdc6b77dd52533244c1f38ac3fb30720c67f1
