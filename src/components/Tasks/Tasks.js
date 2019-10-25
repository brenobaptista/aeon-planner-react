import React from 'react';
import { Button, Badge, Card, CardText, CardBody, CardTitle, UncontrolledButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import classes from './Tasks.module.css';
import Modal from '../Modal/Modal';
import EditTask from '../../containers/EditTask/EditTask';

const Tasks = (props) => (
  <>
    <div className="col-md-4" key={props.taskId}>
      <Card className={`margin-t-b shadow-sm ${classes.whiteBg}`}>
        <CardBody>
          <CardTitle className={classes.greenText} tag="h5">
            {props.taskName}
            <Badge color="link">
              <UncontrolledButtonDropdown>
                <DropdownToggle caret color="secondary" size="sm" className={classes.fixBadge}>
                  <FontAwesomeIcon icon="cog" />
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem onClick={() => props.editTaskButton(props.taskId, props.taskName, props.taskDescription)}>Edit</DropdownItem>
                  <DropdownItem onClick={props.deleteTaskButton}>Delete</DropdownItem>
                </DropdownMenu>
              </UncontrolledButtonDropdown>
            </Badge>
          </CardTitle>
          <CardText>
            {props.taskDescription}
          </CardText>
        </CardBody>
      </Card>
    </div>

    <Modal show={props.editTaskState} clickBackdrop={props.clickBackdrop}>
      {props.editTaskState ?
        <EditTask
          id={props.editTaskId}
          name={props.editTaskName}
          description={props.editTaskDescription}
          listId={props.listId}
          cancel={props.cancel}
          finish={props.finish}
        />
        : null
      }
    </Modal>

    <Modal show={props.deleteTaskState} clickBackdrop={props.clickBackdrop}>
      {props.deleteTaskState ?
        <div>
          <h3 className={classes.greenText}>Are you sure you wish to delete it?</h3><br />
          <Button color="danger" className="margin-teeth" onClick={props.deleteTaskButton}>Cancel</Button>
          <Button color="success" className="margin-teeth" onClick={() => props.deleteTask(props.taskId)}>Yes</Button>
        </div>
        : null}
    </Modal>
  </>
);

export default Tasks;