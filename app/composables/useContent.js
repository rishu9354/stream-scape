export const useContent = () =>{
    // all series,movies lists 
    const getLists = () =>{
    return["wednesday-1","ballerina","winter","special-ops-1.5"];
    };

    // All series lists
    const getShows = () =>{
    return["wednesday-1","special-ops-1.5"];
    };

    return{
        getLists,
        getShows
    };

};