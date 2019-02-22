import style from '../assets/css/footer.css';

export default {
    data() {
        return {
            author: '00'
        }
    },
    render() {
        return (
            <div id="footer">
                <span>written by {this.author}</span>
            </div>
        )
    }
}
