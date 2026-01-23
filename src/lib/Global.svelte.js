export const global = $state({
    typingMode: false,
    allNodes: []
});

function parseRawData() {
    let parsedData = JSON.parse(localStorage.getItem("allNodes"));

    if (!parsedData) {
        let initialNodeArray = [
            {
                id: Date.now().toString(),
                title: '1st Node',
                data: { label: 'Hello World' },
                position: { x: 0, y: 0 },
                parentID: 0,
                childrenIDs: []
            },
        ]

        localStorage.setItem("allNodes", JSON.stringify(initialNodeArray));
        location.reload();
    }

    return parsedData;
}

global.allNodes = parseRawData();