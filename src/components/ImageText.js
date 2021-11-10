export default function ImageText ({data}) {
    return (
        <p>
            {data.map(d => d+',')}
        </p>
    )
}