
export class ToastNotifyService{
    constructor(){

    }
    showToast(message, type = 'default'){
        const toast = document.createElement('div');
        toast.classList.add('toast', type);
        toast.textContent = message;
        const container = document.getElementById('toast-container');
        container.appendChild(toast);
        setTimeout(() => {
            toast.remove();
        }, 3000);
    }

}

