
export default function SearchBar({ input, setInput, searchBar }) {
    return (
        <div >
            <div id="search-bar" style={searchBar}>
                <input autoComplete = "off" type="text" id="searchInput" value={input} onInput={e => { setInput(e.target.value) }} placeholder="🔍 Search for a movie" />
            </div>
        </div>
    )
}


