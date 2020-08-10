import React from 'react';
  
class Modal extends React.Component {
    
    componentDidUpdate(prevProps) {
        const {open, id} = this.props;
        if (!prevProps.open && open)
            document.getElementById(id).showModal();  
        
        if (prevProps.open && !open)
            document.getElementById(id).close();
        
    }

    render() {
        const backStyles={
             backgroundImage: 'linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%)'
        }
        const {title, id, children, handleModalHide} = this.props;
        return (
            <dialog style={backStyles} id={id} className=" fixed h-auto w-11/12 md:w-1/2 p-5  bg-white rounded-md ">
                <div className="flex w-full h-auto justify-center items-center">
                    <div className="flex w-11/12 h-auto py-3 justify-center items-center text-2xl font-bold">
                        {title}
                    </div>
                    <div onClick={handleModalHide} className="flex w-1/12 h-auto justify-center cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </div> 
                </div>
                {children}
            </dialog>
        );
    }
}

export default Modal;