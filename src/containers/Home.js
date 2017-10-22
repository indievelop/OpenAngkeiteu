import React from 'react';
import { AngkeiteuList } from 'components';

class Home extends React.Component {
  constructor(props) {
      super(props);
      this.handleOpenAngkeiteu = this.handleOpenAngkeiteu.bind(this);
  }

  handleOpenAngkeiteu() {
    this.props.history.push('/readAngkeiteu');
  }

  render() {

    var mokData = [
         {_id: '1',
          title: 'asdsad asdas?',
          writer: 'asdas@asdas.com',
          description: 'zxczxc zxczczczczczc asdsadasdasdsadasdsad qqqqqqqqqq?',
          options: [{id:'1', description:'sadasdasd', selectCount:'10'},
                    {id:'2', description:'dfgfdgdfg', selectCount:'30'},
                    {id:'3', description:'asdasda asda', selectCount:'50'}],
          viewCount:'100',
          createdDate:'2016-07-17T14:26:22.428Z'
          },
          {_id: '2',
           title: 'asdsad asdas?',
           writer: 'asdas@asdas.com',
           description: 'zxczxc zxczczczczczc sssssssssssss?',
           options: [{id:'1', description:'sadasdasd', selectCount:'10'},
                     {id:'2', description:'dfgfdgdfg', selectCount:'30'},
                     {id:'3', description:'asdasda asda', selectCount:'50'}],
           viewCount:'100',
           createdDate:'2016-07-17T14:26:22.428Z'
           },
           {_id: '3',
            title: 'asdsad asdas?',
            writer: 'asdas@asdas.com',
            description: 'zxczxc?',
            options: [{id:'1', description:'sadasdasd', selectCount:'10'},
                      {id:'2', description:'dfgfdgdfg', selectCount:'30'},
                      {id:'3', description:'asdasda asda', selectCount:'50'}],
            viewCount:'100',
            createdDate:'2016-07-17T14:26:22.428Z'
            },
            {_id: '4',
             title: 'asdsad asdas?',
             writer: 'asdas@asdas.com',
             description: 'zxczxc zxczczczczczc ssssssssssaaaaa?',
             options: [{id:'1', description:'sadasdasd', selectCount:'10'},
                       {id:'2', description:'dfgfdgdfg', selectCount:'30'},
                       {id:'3', description:'asdasda asda', selectCount:'50'}],
             viewCount:'100',
             createdDate:'2016-07-17T14:26:22.428Z'
             },
             {_id: '5',
              title: 'asdsad asdas?',
              writer: 'asdas@asdas.com',
              description: 'zxczxc zxczczczczczc?',
              options: [{id:'1', description:'sadasdasd', selectCount:'10'},
                        {id:'2', description:'dfgfdgdfg', selectCount:'30'},
                        {id:'3', description:'asdasda asda', selectCount:'50'}],
              viewCount:'100',
              createdDate:'2016-07-17T14:26:22.428Z'
              },
              {_id: '6',
               title: 'asdsad asdas?',
               writer: 'asdas@asdas.com',
               description: 'zxczxc zxczczczczczc?',
               options: [{id:'1', description:'sadasdasd', selectCount:'10'},
                         {id:'2', description:'dfgfdgdfg', selectCount:'30'},
                         {id:'3', description:'asdasda asda', selectCount:'50'}],
               viewCount:'100',
               createdDate:'2016-07-17T14:26:22.428Z'
               },
               {_id: '7',
                title: 'asdsad asdas?',
                writer: 'asdas@asdas.com',
                description: 'zxczxc zxczczczczczc?',
                options: [{id:'1', description:'sadasdasd', selectCount:'10'},
                          {id:'2', description:'dfgfdgdfg', selectCount:'30'},
                          {id:'3', description:'asdasda asda', selectCount:'50'}],
                viewCount:'100',
                createdDate:'2016-07-17T14:26:22.428Z'
                },
                {_id: '8',
                 title: 'asdsad asdas?',
                 writer: 'asdas@asdas.com',
                 description: 'zxczxc zxczczczczczc?',
                 options: [{id:'1', description:'sadasdasd', selectCount:'10'},
                           {id:'2', description:'dfgfdgdfg', selectCount:'30'},
                           {id:'3', description:'asdasda asda', selectCount:'50'}],
                 viewCount:'100',
                 createdDate:'2016-07-17T14:26:22.428Z'
                 }
      ]

    return (
      <div className='container home'>
        <div className='row'>
          <div className='col s12'>
            <div className='section'>
              <h5>hot angkeiteu</h5>
                <AngkeiteuList handleOpenAngkeiteu={this.handleOpenAngkeiteu}
                               data={mokData}/>
            </div>
          </div>
          <div className='col s12'>
            <div className='divider'></div>
            <div className='section'>
              <h5>recent angkeiteu</h5>
                <AngkeiteuList data={mokData}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
