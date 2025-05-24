/* Anything regarding the RSS feed needs to be maintained here */

document.addEventListener('DOMContentLoaded', () => {
    const rssFeedContainer = document.getElementById('rss-feed-container');
    // New RSS feed URL for testing

    const rssUrl = 'https://frutigerspace.wiki/rss.xml'; // <--- Change this line
    const rssToJsonApi = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;

    fetch(rssToJsonApi)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.status !== 'ok' || !data.items || data.items.length === 0) {
                console.error('RSS feed data issue:', data);
                throw new Error('Failed to fetch or parse RSS feed data, or no items found.');
            }

            rssFeedContainer.innerHTML = '<ul></ul>';
            const ul = rssFeedContainer.querySelector('ul');

            data.items.slice(0, 5).forEach(item => {
                const li = document.createElement('li');
                const title = document.createElement('a');
                title.href = item.link;
                title.target = '_blank';
                title.textContent = item.title;

                const description = document.createElement('p');
                description.innerHTML = item.description.replace(/<[^>]*>/g, '');
                if (description.textContent.length > 150) {
                    description.textContent = description.textContent.substring(0, 150) + '...';
                }

                const date = document.createElement('span');
                date.classList.add('rss-date');
                date.textContent = new Date(item.pubDate).toLocaleDateString();

                li.appendChild(title);
                li.appendChild(description);
                li.appendChild(date);
                ul.appendChild(li);
            });
        })
        .catch(error => {
            console.error('Error fetching RSS feed:', error);
            rssFeedContainer.innerHTML = '<p class="rss-loading">Failed to load RSS feed. Please try again later.</p>';
        });
});