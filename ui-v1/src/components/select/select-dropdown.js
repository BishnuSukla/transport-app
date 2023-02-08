import './styles.scss';

function SelectDropdown(props){

    const onChange = (e) => {
        props.onSelectLanguage(e.target.dataset.value); 
    }
    return (
        <div class="select-dropdown">
            <ul onClick={onChange}>
                {
                    props.options.map((option)=>(
                        <li data-value={option.key}>{option.value}</li>
                    ))
                }
            </ul>
        </div>
    )
}
export default SelectDropdown;