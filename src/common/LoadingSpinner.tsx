import { BaseFunctionComponent } from './BaseComponent';

const LoadingSpinner: BaseFunctionComponent = () => {
    return (
        <div className="spinner-grow" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    );
};

export { LoadingSpinner };
