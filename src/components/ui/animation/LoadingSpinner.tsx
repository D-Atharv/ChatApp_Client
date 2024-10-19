import React from 'react';

const Loader: React.FC = () => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="loader">
                <div className="load-inner load-one"></div>
                <div className="load-inner load-two"></div>
                <div className="load-inner load-three"></div>
                <span className="loader-text">Loading</span>
            </div>
        </div>
    );
};

export default Loader;
