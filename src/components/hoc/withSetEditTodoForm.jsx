const withSetEditTodoForm = Component => ({setIsEdit, ...restProps}) => {
    return (
        <>
            <Component {...restProps} setIsEdit={setIsEdit}/>
        </>
    );
}
 
export default withSetEditTodoForm;