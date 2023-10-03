// first collection
const firstCollection = [

    {
        tbNumber: 'JMH-01',
        order: { name: 'sdfl', orderNumber: 'sfhs' }
    },

    {
        tbNumber: 'JMH-06',
        order: { name: 'sddfgfl', orderNumber: 'sdfgfhs' }
    },

    {
        tbNumber: 'JMH-07',
        order: { name: 'sdsdfsfl', orderNumber: 'sfhsdfss' }
    },
    {
        tbNumber: 'JMF-01',
        order: { name: 'sdsdsdffsfl', orderNumber: 'sfhsdfss' }
    }
    ,
    {
        tbNumber: 'JMF-01',
        order: { name: 'sfddsdfsfl', orderNumber: 'sfhsdfss' }
    },
    {
        tbNumber: 'JMF-02',
        order: { name: 'sfddsdfsfl', orderNumber: 'sfhsdfss' }
    }, {
        tbNumber: 'JMF-03',
        order: { name: 'sfddsdfsfl', orderNumber: 'sfhsdfss' }
    },
    {
        tbNumber: 'JMF-03',
        order: { name: 'sfddsdfsfl', orderNumber: 'sfhsdfss' }
    }
    ,
    {
        tbNumber: 'JMF-04',
        order: { name: 'sfddsdfsfl', orderNumber: 'sfhsdfss' }
    }
]
//second collection
const piCollection = [
    {
        tbNumbers: ['JMH-01', 'JMF-03']
    },
    {
        tbNumbers: ['JMF-04']
    },
    {
        tbNumbers: ['JMF-07']
    }
]

// output

const pi = [
    {
        tbNumber: 'JMF-02',
        completed: false
    },
    {
        tbNumber: 'JMF-01',
        completed: false
    },{
        tbNumber: 'JMF-06',
        completed: false
    },
    {
        tbNumber: 'JMF-02',
        completed: false
    },
    {
        tbNumber: 'JMH-01',
        completed: true
    },
    {
        tbNumber: 'JMF-03',
        completed: true
    },
    {
        tbNumber: 'JMF-04',
        completed: true
    },
    {
        tbNumber: 'JMH-07',
        completed: true
    },
]