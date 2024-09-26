export default function displayMail({target}){
    const aquamarine = '#57ffff'

    const mailboxLinks = document.querySelectorAll('.mailbox-link')
    const mailboxes = document.querySelectorAll('.emails')

    mailboxLinks.forEach(
        mailboxLink => {
            if(mailboxLink !== target && mailboxLink.style.border !== 'none') mailboxLink.style.border = 'none'
        }
    )
    target.style.border = `solid 2px ${aquamarine}`
    //display emails
    const targetEmails = document.querySelector(`#emails-${target.id}`)

    mailboxes.forEach(
        mailbox => {
            if(mailbox !== targetEmails) {
                mailbox.style.display = 'none'
            }else{
                mailbox.style.display = 'block'
            }
        }
    )
    //fetch new random emails
    if(target.id === 'inbox'){
        targetEmails.innerHTML = ''

        fetch('https://jsonplaceholder.typicode.com/posts')
        .then(res => res.json())
        .then(
            posts => {
                //select 6 random posts
                const startPos = Math.floor(Math.random() * posts.length)
                posts = posts.slice(startPos, startPos + 6)
                //
                posts.forEach(
                    (post, i) => {
                        const li = document.createElement('li')
                        li.title = 'click to read'
                        li.key = i
                        li.textContent = post.title
                        //add delete icon
                        const deleteIcon = document.createElement('span')
                        deleteIcon.title = 'delete'
                        deleteIcon.className = 'delete-icon'
                        deleteIcon.addEventListener(
                            'click', ({target})=> {
                                target.className = 'binned-delete-icon'
                                document.querySelector('#emails-bin').appendChild(target.parentElement)
                            },
                            {once: true}
                        )
                        li.appendChild(deleteIcon)
                        targetEmails.appendChild(li)
                    }
                )
            },
            err => console.warn(err.message)
        )
        targetEmails.style.display = 'block'
    }

    //binned emails
    const binnedDeleteIcons = document.querySelectorAll('.binned-delete-icon')
    binnedDeleteIcons.forEach(
        binnedDeleteIcon => binnedDeleteIcon.addEventListener(
            //delete permanently from DOM
            'click', ({target})=> target.parentElement.remove()
        )
    )
}