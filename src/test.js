function Componet(state, updateState) {
    return <div onClick={updateState}>{state}</div>
}

function ComponetWrapped() {
    const [a, updateA] = useA();
    const [b, updateB] = useB();
    const [c, updateC] = useC();

    return <Componet state={a,b,c} updateA={updateA} />
}
